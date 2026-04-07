import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Types.ObjectId,
    ref: 'DebugSeassion',
    required: true
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },
  message: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  })

chatSchema.index({ sessionId: 1 })
export default mongoose.model('ChatMessage', chatSchema)