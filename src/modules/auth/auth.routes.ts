import { Router } from "express";
import * as authController from './auth.controller'
const authRoutes = Router()

authRoutes.post('/signup', authController.signup)
authRoutes.post('/login', authController.login)


export default authRoutes