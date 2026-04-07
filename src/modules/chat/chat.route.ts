import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { chatController, getChatsBySessionId } from "./chat.controller";


const chatRouter = Router()

chatRouter.get('/:sessionId', protect, getChatsBySessionId)
chatRouter.post('/:sessionId', protect, chatController)

export default chatRouter