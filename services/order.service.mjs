import * as orderRepo from "../repositories/order.repo.mjs";

export const createOrder = async (data) => {
  return await orderRepo.createOrderRepo(data);
};

export const getOrdersByUser = async (email) => {
  return await orderRepo.getOrdersByUserRepo(email);
};

export const getOrderByPeriod = async (period) => {
  return await orderRepo.getOrderByPeriodRepo(period);
};

export const updateOrderResult = async (period, result) => {
  return await orderRepo.updateOrderResultRepo(period, result);
};

export const deleteOrder = async (id) => {
  return await orderRepo.deleteOrderRepo(id);
};
export const updateOrderResultByPeriod = async (period, result) => {
  return await orderRepo.updateOrderResultByPeriodRepo(period, result);
};

