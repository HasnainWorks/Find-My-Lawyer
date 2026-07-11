import mongoose from "mongoose";

// Define the schema for messages sent to lawyers
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  message: { type: String, required: true },
  recipient: { type: String, required: true }, // renamed from 'lawyerEmail' to match frontend
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
const Message = mongoose.model('Message', messageSchema);

export default Message;
