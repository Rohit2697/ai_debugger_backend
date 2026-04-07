import mongoose from "mongoose";
const aiAnalysisSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Types.ObjectId,
    ref: 'DebugSeassion',
    required: true
  },
  explanation: String,
  rootCause: String,
  fix: String,
  improvedCode: String
}, {
  timestamps: true
})
aiAnalysisSchema.index({ sessionId: 1 })
export default mongoose.model('AiAnalysis', aiAnalysisSchema)