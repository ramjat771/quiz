import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },

    // NEW FIELD 1
    data: { type: String, default: null },

    // NEW FIELD 2
    type: { type: String, default: "withdrawal" },

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
