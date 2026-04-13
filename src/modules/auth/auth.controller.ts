import { Request, Response } from "express";
import * as authServices from './auth.service'
import { generateAccessToken, generateRefreshAccessToken } from '../../utils/jwt'
export const signup = async (req: Request, res: Response) => {
  try {
    const user = await authServices.signup(req.body.email, req.body.password)
    return res.json(user)
  } catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }

}


export const login = async (req: Request, res: Response) => {
  try {
    const user = await authServices.login(req.body.email, req.body.password)
    const token = generateAccessToken(user._id.toString())
    // const refreshToken = generateRefreshAccessToken(user._id.toString())
    return res.json(token)
  } catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}