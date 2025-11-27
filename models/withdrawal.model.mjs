import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // email or userId
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);
export default Withdrawal;
