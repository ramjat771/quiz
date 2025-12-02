import Transaction from "../models/transaction.model.mjs";

export const createTransactionRepo = async (data) => {
  const trx = new Transaction(data);
  return await trx.save();
};

export const getAllTransactionsRepo = async () => {
  return await Transaction.find().sort({ createdAt: -1 });
};

export const getTransactionByIdRepo = async (transactionId) => {
  return await Transaction.findOne({ transactionId });
};

export const getTransactionByEmailRepo = async (email) => {
  return await Transaction.find({ email }).sort({ createdAt: -1 });
};

export const updateTransactionRepo = async (transactionId, updateData) => {
  return await Transaction.findOneAndUpdate(
    { transactionId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

export const deleteTransactionRepo = async (transactionId) => {
  return await Transaction.findOneAndDelete({ transactionId });
};
