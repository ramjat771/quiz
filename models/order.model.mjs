import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // email
    orderAmount: { type: Number, required: true },
    chooseNumber: { type: String, required: true },
    result: { type: String, default: null }, // optional
    period: { type: String, required: true },
    winAmount: { type: Number, default: 0 }

  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
