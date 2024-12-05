import { createCourierOrder } from "../Courier/Courier.controller.js";
import OrderModel from "./orders.model.js";

// GET all orders with optional filters
export const getOrders = async (req, res) => {
  console.log(req.query, "req.query");
  const { status, start_date, end_date } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (start_date && end_date) {
    filter.createdAt = { $gte: new Date(start_date), $lte: new Date(end_date) };
  }

  try {
    const orders = await OrderModel.find(filter);
    res.status(200).json({ success: true, data: orders });
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
    // invoice: courierResponse?.consignment?.invoice,
    // tracking_code: courierResponse?.consignment?.tracking_code,
    // status: courierResponse?.consignment?.status,
    // note: courierResponse?.consignment?.note,
  };

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
    if (ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }
    const order = await OrderModel.findById(id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, data: order });
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

      if (returnResponse.status === 200) {
        existingOrder.status = requestData.status;
        existingOrder.courierMethod = requestData.courierMethod;
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
      const updatedOrder = await OrderModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      console.log(updatedOrder, "updatedOrder");

      if (!updatedOrder)
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });

      res.status(200).json({ success: true, data: updatedOrder });
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
