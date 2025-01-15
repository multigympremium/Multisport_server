import {
  createCourierOrder,
  getCourierOrderInfo,
} from "../Courier/Courier.controller.js";
import ProductModel from "../Product/product.model.js";
import OrderModel from "./orders.model.js";

// GET all orders with optional filters
export const getOrders = async (req, res) => {
  console.log(req.query, "req.query");
  const { status, start_date, end_date, currentPage, limit } = req.query;
  const filter = {};

  if (status) filter.status = status;
  let totalItems = await OrderModel.find(filter).countDocuments();
  if (start_date && end_date) {
    filter.createdAt = { $gte: new Date(start_date), $lte: new Date(end_date) };
  }

  const page = parseInt(currentPage) || 1;
  const limitation = parseInt(limit) || 15;

  // console.log("query", { ...filter, ...bodyData });
  // Calculate total items and total pages
  // const totalItems = await Users;
  const totalPages = Math.ceil(totalItems / limitation);

  try {
    const orders = await OrderModel.find(filter)
      .skip((page - 1) * limitation)
      .limit(limitation);
    res.status(200).json({
      success: true,
      data: orders,
      totalPages,
      totalItems,
      currentPage,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST create a new order
export const createOrder = async (req, res) => {
  const data = req.body;
  // const courierResponse = req?.courierResponse;

  // console.log(courierResponse, "courierResponse");

  // if (!courierResponse.success) {
  //   return res.status(422).json({ success: false, error: courierResponse });
  // }

  const submitData = {
    name: data.name,
    phone: data.phone,
    secondary_phone: data.secondary_phone,
    address: data.address,
    city_id: data.city_id,
    city_name: data.city_name,
    zone_id: data.zone_id,
    area_id: data.area_id,
    area_name: data.area_name,
    special_instruction: data.special_instruction,
    // courierMethod: data.courierMethod,
    items: data.items,
    payment_method: data.payment_method,
    total: data.total,
    color: data?.color,
    size: data?.size,
    deliveryCharge: data?.deliveryCharge,
    itemPerDiscount: data?.itemPerDiscount,
    discount: data?.discount,
    coupon: data?.coupon,
    userId: data?.userId,
    totalItems: data?.totalItems,
    totalActualPrice: data?.totalActualPrice,
  };

  console.log(submitData, "submitData");

  try {
    const orderResult = await OrderModel.create(submitData);
    res.status(200).json({ success: true, data: orderResult });
    // res.status(200).json({ success: true, data: orderResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    // if (ObjectId.isValid(id)) {
    //   throw new Error("Invalid ObjectId");
    // }
    const order = await OrderModel.findById(id);

    let courierResponse;

    if (
      order &&
      order?.status !== "Pending" &&
      order?.courierMethod &&
      order?.courierMethod !== "Custom"
    ) {
      courierResponse = await getCourierOrderInfo(order);
    }

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.courier_status = courierResponse?.delivery_status;

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    // if (ObjectId.isValid(id)) {
    //   throw new Error("Invalid ObjectId");
    // }
    const orders = await OrderModel.find({ userId: id });

    if (!orders && orders.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update order by ID
export const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const requestData = req.body;
  // const { shipping_address_id, products, payment_method } = req.body;

  // if (!shipping_address_id || !products || !payment_method) {
  //   return res.status(400).json({ success: false, message: "Required fields missing" });
  // }

  // const updateData = { shipping_address_id, products, payment_method };

  const existingOrder = await OrderModel.findById(id);

  if (!existingOrder) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  try {
    if (
      existingOrder.status === "Pending" &&
      requestData.status === "Accepted"
    ) {
      existingOrder.courierMethod = requestData.courierMethod;
      const returnResponse = await createCourierOrder(existingOrder);
      console.log(returnResponse, "returnResponse");

      if (
        returnResponse.status === 200 ||
        returnResponse.status === 201 ||
        returnResponse.code === 200 ||
        returnResponse.code === 202
      ) {
        existingOrder.status = requestData?.status;

        existingOrder.courierMethod = requestData?.courierMethod;

        existingOrder.invoice = returnResponse?.consignment?.invoice || "";

        existingOrder.tracking_code =
          returnResponse?.consignment?.tracking_code || "";

        existingOrder.courier_status =
          returnResponse?.consignment?.status ||
          returnResponse?.data?.order_status;

        existingOrder.delivery_fee = returnResponse?.data?.delivery_fee || "";

        existingOrder.merchant_order_id =
          returnResponse?.data?.merchant_order_id || "";

        existingOrder.consignment_id =
          returnResponse?.data?.consignment_id ||
          returnResponse?.consignment?.consignment_id ||
          "";

        const updatedOrder = await existingOrder.save();

        if (updatedOrder) {
          return res
            .status(200)
            .json({ success: true, data: updatedOrder.message });
        }
        return res
          .status(500)
          .json({ success: false, error: "Failed to update order" });
      }
      return res.status(400).json({ success: false, error: returnResponse });
    } else {
      let reportData = {};
      if (requestData.status === "Completed") {
        console.log(requestData.status, "requestData.status");

        reportData = await reduceStockOfItem(existingOrder, res);
      } else {
        reportData.success = true;
      }

      console.log(reportData, "reportData");

      if (!reportData?.success) {
        return res.status(400).json({ success: false, error: reportData });
      }

      const updatedOrder = await OrderModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      console.log(updatedOrder, "updatedOrder");

      if (!updatedOrder)
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });

      res.status(200).json({
        success: true,
        data: updatedOrder,
        updatedProductItems: reportData.updatedItems,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE delete order by ID
export const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    await OrderModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Route to handle order creation and stock update
export const reduceStockOfItem = async (order, res) => {
  try {
    const { items } = order;

    console.log(order, "Order details");

    const updatedItems = [];

    // Update stock and color/size quantities for each item in the order
    for (const item of items) {
      const product = await ProductModel.findById(item._id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item._id} not found.` });
      }

      console.log(product, "Fetched product details");

      // Find the color and size combination
      const colorAndSize = product.colorAndSize.find(
        (cs) =>
          cs.color.value === item.color &&
          cs.size.some((size) => size.value === item.size)
      );

      if (!colorAndSize) {
        return res.status(400).json({
          message: `Color and size combination not found for product ID ${item._id}.`,
          success: false,
        });
      }

      console.log(colorAndSize, "Matching color and size combination");

      // Ensure sufficient stock
      if (parseInt(colorAndSize.quantity) < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product ID ${item._id} with color ${item.color} and size ${item.size}.`,
          success: false,
        });
      }

      // Deduct the stock for the specific color and size
      colorAndSize.quantity = (
        parseInt(colorAndSize.quantity) - item.quantity
      ).toString();

      console.log(
        `Updated quantity for color: ${item.color}, size: ${item.size}, new quantity: ${colorAndSize.quantity}`
      );

      // Deduct overall stock
      product.stock -= item.quantity;

      console.log(
        `Updated overall stock for product ID ${item._id}: ${product.stock}`
      );

      // Update all matching color and size items
      const allItemsOfColorAndSize = product.colorAndSize.map(
        (sizeAndColorItem) => {
          if (
            sizeAndColorItem.color.value === colorAndSize.color.value &&
            sizeAndColorItem.size.some((size) => size.value === item.size)
          ) {
            sizeAndColorItem.quantity = (
              parseInt(sizeAndColorItem.quantity) - item.quantity
            ).toString();

            console.log(
              `Updated quantity for color ${sizeAndColorItem.color.value} and size ${item.size}: ${sizeAndColorItem.quantity}`
            );
          }
          return sizeAndColorItem;
        }
      );

      console.log(allItemsOfColorAndSize, "allItemsOfColorAndSize");

      product.colorAndSize = allItemsOfColorAndSize;

      updatedItems.push(product);

      // Save the updated product
      const updatedProductReport = await product.save();

      console.log(
        `Product ID ${product._id} updated successfully.`,
        updatedProductReport,
        "updatedProductReport"
      );
    }

    console.log(updatedItems, "Updated items after stock reduction");

    // Save the order if needed (commented out, assuming no additional changes to the order object)
    // await order.save();

    return { success: true, updatedItems };
  } catch (error) {
    console.error("Error reducing stock:", error);
    return { success: false, error: error.message || error };
  }
};
