import * as balanceRepo from "../repositories/balance.repo.mjs";
import { CustomError } from "../utils/custom_error.mjs";

// 1️⃣ Init or Get
export const initOrGetBalance = async (email, requestType = "") => {
  if (requestType) console.log("Init/Get Balance:", requestType);

  const existing = await balanceRepo.getBalanceRepo(email);
  if (existing) return existing;

  return await balanceRepo.createBalanceRepo(email);
};

// 2️⃣ Overwrite Balance
export const updateBalance = async (email, amount, requestType = "") => {
  if (requestType) console.log("Update Balance:", requestType);

  const existing = await balanceRepo.getBalanceRepo(email);
  if (!existing) throw new CustomError("Balance record not found", 404);

  return await balanceRepo.setBalanceRepo(email, amount);
};

// 3️⃣ Add Balance
export const addBalance = async (email, amount, requestType = "") => {
  if (requestType) console.log("Add Balance:", requestType);

  return await balanceRepo.addBalanceRepo(email, amount);
};

// 4️⃣ Subtract Balance (only if enough)
export const subtractBalance = async (email, amount, requestType = "") => {
  if (requestType) console.log("Subtract Balance:", requestType);

  return await balanceRepo.subtractBalanceRepo(email, amount);
};
