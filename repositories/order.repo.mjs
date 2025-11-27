import Order from "../models/order.model.mjs";

export const createOrderRepo = async (data) => {
  return await Order.create(data);
};

export const getOrdersByUserRepo = async (email) => {
  return await Order.find({ userId: email }).sort({ createdAt: -1 });
};

export const getOrderByPeriodRepo = async (period) => {
  return await Order.findOne({ period });
};

export const updateOrderResultRepo = async (period, result) => {
  return await Order.findOneAndUpdate(
    { period },
    { $set: { result } },
    { new: true }
  );
};

export const deleteOrderRepo = async (id) => {
  return await Order.findByIdAndDelete(id);
};
