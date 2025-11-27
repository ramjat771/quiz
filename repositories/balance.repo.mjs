import Balance from "../models/balance.model.mjs";

// Create if not exist
export const createBalanceRepo = async (email) => {
  return await Balance.findOneAndUpdate(
    { userId: email },
    {},
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

// Get
export const getBalanceRepo = async (email) => {
  return await Balance.findOne({ userId: email });
};

// Overwrite
export const setBalanceRepo = async (email, amount) => {
  return await Balance.findOneAndUpdate(
    { userId: email },
    { $set: { balance: amount } },
    { new: true }
  );
};

// Add
export const addBalanceRepo = async (email, amount) => {
  return await Balance.findOneAndUpdate(
    { userId: email },
    { $inc: { balance: amount } },
    { new: true }
  );
};

// Subtract ONLY if balance >= amount
export const subtractBalanceRepo = async (email, amount) => {
  return await Balance.findOneAndUpdate(
    { userId: email, balance: { $gte: amount } }, 
    { $inc: { balance: -amount } },
    { new: true }
  );
};
