import * as balanceService from "../services/balance.service.mjs";
import { successResponse } from "../utils/api_response.mjs";
import { CustomError } from "../utils/custom_error.mjs";
import { requestController } from "./request.controller.mjs";

// =========================
// 1️⃣ Init or Get Balance
// =========================
export const initOrGetBalanceController = async (req, res, next) => {
  try {
    const { email, requestType } = req.body;

    if (!email) throw new CustomError("email is required", 400);

    const result = await balanceService.initOrGetBalance(email, requestType);

    return successResponse(res, result, "Balance fetched");
  } catch (err) {
    next(err);
  }
};

// =========================
// 2️⃣ Update Balance (overwrite)
// =========================
export const updateBalanceController = async (req, res, next) => {
  try {
    const { email, amount, requestType } = req.body;

    if (!email) throw new CustomError("email is required", 400);
    if (typeof amount !== "number") {
      throw new CustomError("amount must be a number", 400);
    }

    const result = await balanceService.updateBalance(email, amount, requestType);

    return successResponse(res, result, "Balance updated successfully");
  } catch (err) {
    next(err);
  }
};

// =========================
// 3️⃣ Add Balance
// =========================
export const addBalanceController = async (req, res, next) => {
  try {
    const { email, amount, requestType } = req.body;

    if (!email) throw new CustomError("email is required", 400);
    if (typeof amount !== "number" || amount <= 0) {
      throw new CustomError("amount must be a positive number", 400);
    }

    const result = await balanceService.addBalance(email, amount, requestType);

    return successResponse(res, result, "Balance added");
  } catch (err) {
    next(err);
  }
};

// =========================
// 4️⃣ Subtract Balance
// =========================
export const subtractBalanceController = async (req, res, next) => {
  console.log(req.body)
  try {
    const { email, amount, requestType } = req.body;

    if(requestType){
     // console.log(requestType,`${9} request type is ${requestType.type}`)
      requestController(requestType)
    }

    if (!email) throw new CustomError("email is required", 400);
    if (typeof amount !== "number" || amount <= 0) {
      throw new CustomError("amount must be a positive number", 400);
    }

    const result = await balanceService.subtractBalance(email, amount, requestType);

    if (!result) {
      throw new CustomError("Invalid amount, insufficient balance", 400);
    }

    return successResponse(res, result, "Balance subtracted");
  } catch (err) {
    next(err);
  }
};
