import * as trxService from "../services/transaction.service.mjs";
import { successResponse, errorResponse } from "../utils/api_response.mjs";

export const createTransactionController = async (req, res, next) => {
  try {
    const result = await trxService.createTransaction(req.body);

    if (!result.created) {
      return errorResponse(res, result.message, 400, null);
    }

    return successResponse(res, result.transaction, result.message);
  } catch (err) {
    next(err);
  }
};

export const getAllTransactionsController = async (req, res, next) => {
  try {
    const trxs = await trxService.getAllTransactions();
    return successResponse(res, trxs, "Transactions fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const getTransactionByIdController = async (req, res, next) => {
  try {
    const trx = await trxService.getTransactionById(req.params.id);

    if (!trx) return successResponse(res, null, "Transaction not found", 404);

    return successResponse(res, trx, "Transaction fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const getTransactionByEmailController = async (req, res, next) => {
  try {
    const trxs = await trxService.getTransactionByEmail(req.params.email);

    return successResponse(res, trxs, "Transactions fetched successfully");
  } catch (err) {
    next(err);
  }
};

export const updateTransactionController = async (req, res, next) => {
  try {
    const trx = await trxService.updateTransaction(req.params.id, req.body);

    if (!trx) return successResponse(res, null, "Transaction not found", 404);

    return successResponse(res, trx, "Transaction updated successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteTransactionController = async (req, res, next) => {
  try {
    const trx = await trxService.deleteTransaction(req.params.id);

    if (!trx) return successResponse(res, null, "Transaction not found", 404);

    return successResponse(res, null, "Transaction deleted successfully");
  } catch (err) {
    next(err);
  }
};
