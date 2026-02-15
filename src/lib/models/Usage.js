import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
  {
    ip: { type: String, index: true },
    messagesUsed: { type: Number, default: 0 },
    lastMessageAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Usage || mongoose.model("Usage", usageSchema);
