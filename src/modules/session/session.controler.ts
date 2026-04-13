import { AuthRequest } from "../../middleware/auth.middleware";
import { Response } from "express";
import * as sessionServices from './session.service'
import { detectLanguage } from "../../utils/languageDetection";


export const createDebugSession = async (req: AuthRequest, res: Response) => {
  try {
    const seassion = await sessionServices.createSession(
      { ...req.body, language: await detectLanguage(req.body.codeSnippet) || 'unknown' },
      req.userId!
    )
    return res.json(seassion)
  } catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }


}

export const getSessions = async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await sessionServices.getSeassions(req.userId!)
    return res.json(sessions)
  } catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}

export const getSessionById = async (req: AuthRequest, res: Response) => {
  try {
    const session = await sessionServices.getSeassionById(req.params.id as string, req.userId!)
    if (!session) {
      return res.status(404).json({ message: 'No Session Found!' })
    }
    return res.json(session)
  } catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}


export const deleteSessionById = async (req: AuthRequest, res: Response) => {
  try {
    await sessionServices.deleteSessionById(req.params.id as string, req.userId!)
    res.json({ message: 'Deleted' })
  } catch (err: any) {
    return res.status(400).json({
      message: err.message
    })
  }
}