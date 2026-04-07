import mongoose from "mongoose";


const debugSeassionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  errorMessage: {
    type: String,
    required: true
  },
  codeSnippet: {
    type: String
  },
  context: {
    type: String
  },
  language: {
    type: String,
    default: 'javascript'
  }
}, {
  timestamps: true
})

debugSeassionSchema.index({ userId: 1 })
export default mongoose.model('DebugSeassion', debugSeassionSchema)