import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import * as sessionController from './session.controler'
const sessionRouter = Router()

sessionRouter.post('/', protect, sessionController.createDebugSession)
sessionRouter.get('/', protect, sessionController.getSessions)
sessionRouter.get('/:id', protect, sessionController.getSessionById)
sessionRouter.delete('/:id', protect, sessionController.deleteSessionById)

export default sessionRouter