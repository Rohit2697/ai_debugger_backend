import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { analyzeError, getAnalysisSVC } from "./ai.service";
import AiAnalysis from './ai.model'
export const analyze = async (req: AuthRequest, res: Response) => {
  try {
    const existing = await AiAnalysis.findOne({ sessionId: req.params.sessionId as string })
    if (existing) return res.json(existing)
    const result = await analyzeError(req.params.sessionId as string)


    const saved = await AiAnalysis.create({
      sessionId: req.params.sessionId as string,
      ...result
    })
    return res.json(saved)
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const getAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const analysis = await getAnalysisSVC(req.params.sessionId as string)
    if (!analysis) return res.status(404).json({ message: "Analysis not found" })
    return res.json(analysis)
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
} 