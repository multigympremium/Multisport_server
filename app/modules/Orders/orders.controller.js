
import courierAccessToken from "../../../config/courier/courierAccessToken.js";
import { courierOrderCreate } from "../../../config/courier/courierOrderCreate.js";
import { courierStoreCreate } from "../../../config/courier/courierStoreCreate.js";
import OrderModel from "./orders.model.js";

// GET all orders with optional filters
export const getOrders = async (req, res) => {
  const { status, start_date, end_date } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (start_date && end_date) {
    filter.createdAt = { $gte: new Date(start_date), $lte: new Date(end_date) };
  }

  try {
    const orders = await OrderModel.find(filter).populate("shipping_address_id");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// POST create a new order
export const createOrder = async (req, res) => {
  const { shipping_address_id, products, payment_method, total } = req.body;

  if (!shipping_address_id || !products || !payment_method || !total) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  const submitData = { shipping_address_id, products, payment_method, total };

  const accessToken = await courierAccessToken();

  // const storeReport = await courierStoreCreate({...submitData, accessToken: accessToken.access_token});

  const returnOrderData = await courierOrderCreate({...submitData, accessToken: accessToken.access_token});

  console.log(returnOrderData, "returnOrderData");
  try {
    // const orderResult = await OrderModel.create(submitData);
    res.status(200).json({ success: true, error: returnOrderData });
    // res.status(200).json({ success: true, data: orderResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id).populate("shipping_address_id");
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT update order by ID
export const updateOrderById = async (req, res) => {
  const { id } = req.params;
  // const { shipping_address_id, products, payment_method } = req.body;

  // if (!shipping_address_id || !products || !payment_method) {
  //   return res.status(400).json({ success: false, message: "Required fields missing" });
  // }

  // const updateData = { shipping_address_id, products, payment_method };



  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("shipping_address_id");

    console.log(updatedOrder, "updatedOrder");

    if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE delete order by ID
export const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id).populate("shipping_address_id");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    await OrderModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
