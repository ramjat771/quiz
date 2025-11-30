import * as withdrawalService from "../services/withdrawal.service.mjs";
import { successResponse } from "../utils/api_response.mjs";
import { CustomError } from "../utils/custom_error.mjs";

export const createWithdrawalController = async (req, res, next) => {
  try {
    const { userId, amount, data, type } = req.body;

    if (!userId) throw new CustomError("userId required", 400);
    if (!amount || typeof amount !== "number" || amount <= 0) {
      throw new CustomError("Amount must be a positive number", 400);
    }

    const payload = {
      userId,
      amount,
      data: data || null,
      type: type || "withdrawal"
    };

    const result = await withdrawalService.createWithdrawal(payload);

    return successResponse(res, result, "Withdrawal request created");
  } catch (err) {
    next(err);
  }
};

// Get all withdrawal requests of user
export const getWithdrawalsByUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) throw new CustomError("userId required", 400);

    const result = await withdrawalService.getWithdrawalsByUser(userId);

    return successResponse(res, result, "Withdrawals fetched");
  } catch (err) {
    next(err);
  }
};

// Update status (admin)
export const updateWithdrawalStatusController = async (req, res, next) => {
  try {
    const { id, status } = req.body;

    if (!id) throw new CustomError("id required", 400);
    if (!["pending", "approved", "rejected"].includes(status)) {
      throw new CustomError("Invalid status", 400);
    }

    const result = await withdrawalService.updateWithdrawalStatus(id, status);

    return successResponse(res, result, "Withdrawal status updated");
  } catch (err) {
    next(err);
  }
};
