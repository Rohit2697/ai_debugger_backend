import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import env from "../environments/env";
export interface AuthRequest extends Request {
  userId?: string
}

export const protect = async (
  req: AuthRequest, res: Response, next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'No Token Provided!' })
    const decode = jwt.verify(token, env.jwt_secret!) as { userId: string }
    req.userId = decode.userId
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Invalid Token!' })
  }
}