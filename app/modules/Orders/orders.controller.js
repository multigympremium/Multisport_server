import mongoose from "mongoose";
import {
  createCourierOrder,
  getCourierOrderInfo,
} from "../Courier/Courier.controller.js";
import ProductModel from "../Product/product.model.js";
import OrderModel from "./orders.model.js";
import sendInvoiceEmail from "../../../config/email/sendInvoiceEmail.js";

// GET all orders with optional filters
// export const getOrders = async (req, res) => {
//   console.log(req.query, "req.query");
//   const { status, start_date, end_date, currentPage, limit } = req.query;
//   const filter = {};

//   if (status) filter.status = status;
//   let totalItems = await OrderModel.find(filter).countDocuments();
//   if (start_date && end_date) {
//     filter.createdAt = { $gte: new Date(start_date), $lte: new Date(end_date) };
//   }

//   const page = parseInt(currentPage) || 1;
//   const limitation = parseInt(limit) || 15;

//   // console.log("query", { ...filter, ...bodyData });
//   // Calculate total items and total pages
//   // const totalItems = await Users;
//   const totalPages = Math.ceil(totalItems / limitation);

//   try {
//     const orders = await OrderModel.find(filter)
//       .skip((page - 1) * limitation)
//       .limit(limitation);

//     const totalDeliveredOrderPrices = await OrderModel.aggregate([
//       {
//         $match: {
//           status: "DeliveredToCourier",
//         },
//       },
//       { $group: { _id: null, totalTk: { $sum: "$total" } } },
//       {
//         $project: {
//           _id: 0,
//           userId: "$_id",
//           totalPrice: "$totalTk",
//         },
//       },
//     ]);

//     const totalPackagingOrderPrices = await OrderModel.aggregate([
//       {
//         $match: {
//           status: "Packaging",
//         },
//       },
//       { $group: { _id: null, totalTk: { $sum: "$total" } } },
//       {
//         $project: {
//           _id: 0,
//           userId: "$_id",
//           totalPrice: "$totalTk",
//         },
//       },
//     ]);

//     const totalReadyToShipOrderPrices = await OrderModel.aggregate([
//       {
//         $match: {
//           status: "Packed",
//         },
//       },
//       { $group: { _id: null, totalTk: { $sum: "$total" } } },
//       {
//         $project: {
//           _id: 0,
//           userId: "$_id",
//           totalPrice: "$totalTk",
//         },
//       },
//     ]);

//     const totalPendingOrderPrices = await OrderModel.aggregate([
//       {
//         $match: {
//           status: "Pending",
//         },
//       },
//       { $group: { _id: null, totalTk: { $sum: "$total" } } },
//       {
//         $project: {
//           _id: 0,
//           userId: "$_id",
//           totalPrice: "$totalTk",
//         },
//       },
//     ]);

//     const totalCancelledOrderPrices = await OrderModel.aggregate([
//       {
//         $match: {
//           status: "Cancelled",
//         },
//       },
//       { $group: { _id: null, totalTk: { $sum: "$total" } } },
//       {
//         $project: {
//           _id: 0,
//           userId: "$_id",
//           totalPrice: "$totalTk",
//         },
//       },
//     ]);
//     const totalCompletedOrderPrices = await OrderModel.aggregate([
//       {
//         $match: {
//           status: "Completed",
//         },
//       },
//       { $group: { _id: null, totalTk: { $sum: "$total" } } },
//       {
//         $project: {
//           _id: 0,
//           userId: "$_id",
//           totalPrice: "$totalTk",
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: orders,
//       totalPages,
//       totalItems,
//       currentPage,
//       totalDeliveredOrderPrices,
//       totalPackagingOrderPrices,
//       totalReadyToShipOrderPrices,
//       totalPendingOrderPrices,
//       totalCancelledOrderPrices,
//       totalCompletedOrderPrices,
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// Utility Function for Aggregation
const getTotalPriceByStatus = async (status) => {
  const [result] = await OrderModel.aggregate([
    { $match: { status } },
    { $group: { _id: null, totalTk: { $sum: { $toDouble: "$total" } } } },
    { $project: { _id: 0, totalPrice: "$totalTk" } },
  ]);
  return result?.totalPrice || 0;
};

// Controller Function
export const getOrders = async (req, res) => {
  try {
    const {
      status,
      start_date,
      end_date,
      currentPage = 1,
      limit = 15,
      search,
      date,
    } = req.query;

    const filter = {};
    if (status) filter.status = status;

    if (start_date && end_date) {
      filter.order_date = {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      };
    }
    if (date) {
      filter.order_date = {
        $gte: date,
        $lte: date,
      };
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");

      // Check if the search term is a valid ObjectId
      const isObjectId = mongoose.Types.ObjectId.isValid(search);

      filter.$or = [
        { name: { $regex: searchRegex } },
        { phone: { $regex: searchRegex } },
      ];

      // Add _id condition only if search is a valid ObjectId
      if (isObjectId) {
        filter.$or.push({ _id: search });
      }
    }

    const page = parseInt(currentPage, 10);
    const limitation = parseInt(limit, 10);

    const totalItems = await OrderModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitation);

    console.log(filter, "filter");

    const orders = await OrderModel.find(filter)
      .skip((page - 1) * limitation)
      .limit(limitation);

    // Calculate total prices by status
    const statuses = [
      "DeliveredToCourier",
      "Packaging",
      "Packed",
      "Pending",
      "Cancelled",
      "Completed",
    ];

    const totalPricesByStatus = await Promise.all(
      statuses.map((status) => getTotalPriceByStatus(status))
    );

    const response = {
      success: true,
      data: orders,
      totalPages,
      totalItems,
      currentPage: page,
      totalPricesByStatus: {
        DeliveredToCourier: totalPricesByStatus[0],
        Packaging: totalPricesByStatus[1],
        Packed: totalPricesByStatus[2],
        Pending: totalPricesByStatus[3],
        Cancelled: totalPricesByStatus[4],
        Completed: totalPricesByStatus[5],
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
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
    orderOverview: data?.orderOverview,
  };

  console.log(submitData, "submitData");

  if (data.email !== "" || data.email !== undefined || data.email !== null) {
    submitData.email = data.email;
    const emailResponse = await sendInvoiceEmail({
      recipients: data.email,
      data: submitData,
    });

    console.log(emailResponse, "emailResponse", data.deliveryCharge);
  }

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
      order?.status !== "Packaging" &&
      order?.courierMethod &&
      order?.courierMethod !== "Custom"
    ) {
      courierResponse = await getCourierOrderInfo(order);
    }

    console.log("courierResponse", courierResponse);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.courier_status =
      courierResponse?.delivery_status || courierResponse?.data?.order_status;

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getOrderByUserId = async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;
  try {
    // if (ObjectId.isValid(id)) {
    //   throw new Error("Invalid ObjectId");
    // }

    const filter = {};
    if (id) {
      filter.userId = id;
    }
    if (status) filter.status = status;
    const orders = await OrderModel.find(filter);

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
      existingOrder.status === "Packaging" &&
      requestData.status === "Packed"
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

        console.log("existingOrder", existingOrder);

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

      if (!reportData?.success) {
        return res.status(400).json({ success: false, error: reportData });
      }

      const updatedOrder = await OrderModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

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
    const isSizeAlreadyUsed = [];

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
        return {
          message: `Color and size combination not found for product ID ${item._id}.`,
          success: false,
        };
      }

      console.log(
        JSON.stringify(colorAndSize),
        "Matching color and size combination"
      );

      // Ensure sufficient stock
      if (parseInt(colorAndSize.quantity) < item.quantity) {
        return {
          message: `Insufficient stock for product ID ${item._id} with color ${item.color} and size ${item.size}.`,
          success: false,
        };
      }

      // Deduct the stock for the specific color and size
      // colorAndSize.quantity = (
      //   parseInt(colorAndSize.quantity) - item.quantity
      // ).toString();

      // console.log(
      //   `Updated quantity for color: ${item.color}, size: ${item.size}, new quantity: ${colorAndSize.quantity}`
      // );

      // Deduct overall stock
      product.stock -= item.quantity;

      console.log(
        `Updated overall stock for product ID ${item._id}: ${product.stock}`
      );

      // Update all matching color and size items

      const allItemsOfColorAndSize = product.colorAndSize.map(
        (sizeAndColorItem) => {
          console.log(
            !isSizeAlreadyUsed.some(
              (usedSizeAndColor) =>
                usedSizeAndColor.size === item.size &&
                usedSizeAndColor.color === item.color
            ),
            "isSizeAlreadyUsed"
          );
          if (
            sizeAndColorItem.color.value === item.color &&
            sizeAndColorItem.size.some((size) => size.value === item.size) &&
            !isSizeAlreadyUsed.some(
              (usedSizeAndColor) =>
                usedSizeAndColor.size === item.size &&
                usedSizeAndColor.color === item.color
            )
          ) {
            console.log(
              `Updated quantity for color ${
                sizeAndColorItem.color.value
              } and size ${item.size}: ${
                sizeAndColorItem.quantity
              } before update : ${JSON.stringify(sizeAndColorItem)}`
            );
            sizeAndColorItem.quantity -= item.quantity;
            isSizeAlreadyUsed.push({ size: item.size, color: item.color });

            sizeAndColorItem.size.map((childSize) => {
              console.log(
                childSize,
                "childSize",
                item.size,
                "item.size",
                childSize.value,
                "item.size",
                childSize.quantity,
                "item.quantity"
              );
              if (childSize.value === item.size) {
                childSize.quantity -= item.quantity;
              }
            });

            // console.log(
            //   `Updated quantity for color ${sizeAndColorItem.color.value} and size ${item.size}: ${sizeAndColorItem.quantity} : ${sizeAndColorItem} after update`
            // );
          }
          return sizeAndColorItem;
        }
      );

      // console.log(
      //   JSON.stringify(allItemsOfColorAndSize),
      //   "allItemsOfColorAndSize"
      // );

      product.colorAndSize = allItemsOfColorAndSize;

      updatedItems.push(product);

      // Save the updated product
      const updatedProductReport = await ProductModel.findByIdAndUpdate(
        item._id,
        product,
        {
          new: true,
          runValidators: true,
        }
      );

      // console.log(
      //   `Product ID ${product._id} updated successfully.`,
      //   updatedProductReport,
      //   "updatedProductReport"
      // );
    }

    // console.log(updatedItems, "Updated items after stock reduction");

    // Save the order if needed (commented out, assuming no additional changes to the order object)
    // await order.save();

    return { success: true, updatedItems };
  } catch (error) {
    console.error("Error reducing stock:", error);
    return { success: false, error: error.message || error };
  }
};

// GET single order by ID
export const addWeightToOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // if (ObjectId.isValid(id)) {
    //   throw new Error("Invalid ObjectId");
    // }
    const order = await OrderModel.findById(id);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.totalWeight = req.body.totalWeight;
    const updatedOrder = await order.save();

    if (!updatedOrder)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
