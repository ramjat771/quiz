
import mongoose from "mongoose";
const balanceSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, required: true,default: 0},
    requestType: { type: String, default: "default" },
  },
  { timestamps: true }
);

const Balance = mongoose.model("Balance", balanceSchema);
export default Balance;