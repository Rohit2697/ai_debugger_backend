import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { chatController, deleteChatsBySessionId, getChatsBySessionId } from "./chat.controller";


const chatRouter = Router()

chatRouter.get('/:sessionId', protect, getChatsBySessionId)
chatRouter.post('/:sessionId', protect, chatController)
chatRouter.delete('/:sessionId', protect, deleteChatsBySessionId)
export default chatRouter