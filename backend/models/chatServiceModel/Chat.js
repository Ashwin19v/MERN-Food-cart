const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "fromModel",
  },
  fromModel: {
    type: String,
    required: true,
    enum: ["User", "Admin"],
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "toModel",
  },
  toModel: {
    type: String,
    required: true,
    enum: ["User", "Admin"],
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
