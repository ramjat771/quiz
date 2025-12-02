import * as trxRepo from "../repositories/transaction.repo.mjs";

export const createTransaction = async (data) => {
  // Check duplicate transactionId
  const exists = await trxRepo.getTransactionByIdRepo(data.transactionId);
  if (exists) {
    return {
      created: false,
      message: "Transaction ID already exists",
    };
  }

  const trx = await trxRepo.createTransactionRepo(data);

  return {
    created: true,
    message: "Transaction created successfully",
    transaction: trx,
  };
};

export const getAllTransactions = async () => {
  return await trxRepo.getAllTransactionsRepo();
};

export const getTransactionById = async (transactionId) => {
  return await trxRepo.getTransactionByIdRepo(transactionId);
};

export const getTransactionByEmail = async (email) => {
  return await trxRepo.getTransactionByEmailRepo(email);
};

export const updateTransaction = async (transactionId, updateData) => {
  return await trxRepo.updateTransactionRepo(transactionId, updateData);
};

export const deleteTransaction = async (transactionId) => {
  return await trxRepo.deleteTransactionRepo(transactionId);
};
