import * as withdrawRepo from "../repositories/withdrawal.repo.mjs";

export const createWithdrawal = async (data) => {
  return await withdrawRepo.createWithdrawalRepo(data);
};

export const getWithdrawalsByUser = async (userId) => {
  return await withdrawRepo.getWithdrawalByUserRepo(userId);
};

export const updateWithdrawalStatus = async (id, status) => {
  return await withdrawRepo.updateWithdrawalStatusRepo(id, status);
};
