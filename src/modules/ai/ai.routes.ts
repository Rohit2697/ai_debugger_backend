import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { analyze, deleteAnalysis, getAnalysis } from "./ai.controller";

const aiRoute = Router()

aiRoute.post('/analyze/:sessionId', protect, analyze)
aiRoute.get('/analyze/:sessionId', protect, getAnalysis)
aiRoute.delete('/analyze/:sessionId', protect, deleteAnalysis)
export default aiRoute