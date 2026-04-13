import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { analyze, getAnalysis } from "./ai.controller";

const aiRoute = Router()

aiRoute.post('/analyze/:sessionId', protect, analyze)
aiRoute.get('/analysis/:sessionId', protect, getAnalysis)
export default aiRoute