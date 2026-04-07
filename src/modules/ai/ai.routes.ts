import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { analyze } from "./ai.controller";

const aiRoute = Router()

aiRoute.post('/analyze/:sessionId', protect, analyze)

export default aiRoute