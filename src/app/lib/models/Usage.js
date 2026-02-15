import mongoose from "mongoose";

const usageSchema = new mongoose.Schema({
  ip: String,
  messagesUsed: { type: Number, default: 0 },
  lastMessageAt: Date,
}, { timestamps: true });

export default mongoose.models.Usage ||
  mongoose.model("Usage", usageSchema);