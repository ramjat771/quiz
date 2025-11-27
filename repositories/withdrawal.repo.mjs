import Withdrawal from "../models/withdrawal.model.mjs";

export const createWithdrawalRepo = async (data) => {
  return await Withdrawal.create(data);
};

export const getWithdrawalByUserRepo = async (userId) => {
  return await Withdrawal.find({ userId }).sort({ createdAt: -1 });
};

export const updateWithdrawalStatusRepo = async (id, status) => {
  return await Withdrawal.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  );
};
