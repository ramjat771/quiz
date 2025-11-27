import * as orderService from "../services/order.service.mjs";
import { successResponse } from "../utils/api_response.mjs";
import { CustomError } from "../utils/custom_error.mjs";

// =========================
// Create Order
// =========================
export const createOrderController = async (req, res, next) => {
  try {
    const { userId, orderAmount, chooseNumber, period } = req.body;

    if (!userId) throw new CustomError("userId is required", 400);
    if (!orderAmount) throw new CustomError("orderAmount required", 400);
    if (chooseNumber === undefined) throw new CustomError("chooseNumber required", 400);
    if (!period) throw new CustomError("period required", 400);

    const order = await orderService.createOrder({
      userId,
      orderAmount,
      chooseNumber,
      period
    });

    return successResponse(res, order, "Order created");
  } catch (err) {
    next(err);
  }
};

// Fetch orders by email
export const getOrdersByUserController = async (req, res, next) => {
  try {
    const { email } = req.params;

    const orders = await orderService.getOrdersByUser(email);

    return successResponse(res, orders, "Orders fetched successfully");
  } catch (err) {
    next(err);
  }
};

// Fetch order by period
export const getOrderByPeriodController = async (req, res, next) => {
  try {
    const { period } = req.params;

    const order = await orderService.getOrderByPeriod(period);

    return successResponse(res, order, "Order fetched successfully");
  } catch (err) {
    next(err);
  }
};

// Update order result
export const updateOrderResultController = async (req, res, next) => {
  try {
    const { period, result } = req.body;

    if (!period) throw new CustomError("period is required", 400);

    const updated = await orderService.updateOrderResult(period, result);

    return successResponse(res, updated, "Order updated");
  } catch (err) {
    next(err);
  }
};

// Delete order
export const deleteOrderController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await orderService.deleteOrder(id);

    return successResponse(res, deleted, "Order deleted");
  } catch (err) {
    next(err);
  }
};
