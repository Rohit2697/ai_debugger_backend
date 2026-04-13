import { openai } from "../../config/openai";
import DebugSession from '../session/session.model'
import AiAnalysis from './ai.model'
const analyzerPrompt = (errorMessage: string, codeSnippet: string | null | undefined, context: string | null | undefined) => {
  return `You are a senior software engineer.\nAnalyze the following error and code.\nError:\n${errorMessage}\nCode:${codeSnippet}\ncontext:${context}
  \nReturn ONLY valid JSON:\n{\n"explanation": "...",\n"rootCause": "...",\n"fix": "...",\n"improvedCode": "..."\n}`
}

export const analyzeError = async (sessionId: string) => {
  const session = await DebugSession.findById(sessionId)
  if (!session) throw new Error("Unable to find the session!");
  const prompt = analyzerPrompt(session.errorMessage, session.codeSnippet, session.context)
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: "user", content: prompt
      }
    ]
  })
  try {
    return JSON.parse(response.choices[0]?.message.content!)
  } catch (err) {
    console.log(err)
    throw new Error("AI response parsing failed");
  }
}

export const getAnalysisSVC = async (sessionId: string) => { 
  const analysis = await AiAnalysis.findOne({ sessionId })
  return analysis
} 
