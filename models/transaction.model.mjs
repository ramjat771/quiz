import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
  type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
     default: 0
    },
    status: {
      type: String,
      enum: ["pending", "complete", "confirmed"],
      default: "pending",
    },
    extra: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
