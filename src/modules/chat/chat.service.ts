import { openai } from '../../config/openai'
import DebugSession from '../session/session.model'
import chatModel from './chat.model'
import ChatMessage from './chat.model'

const generateChatSystemPrompt = (errorMessage: string, codeSnippet: string, context: string) => {
  return `
You are a senior debugging assistant.

You are helping debug this issue:

Error:
${errorMessage}

Code:
${codeSnippet}

Context:
${context}

Always give clear, concise, practical answers.
      `
}


export const chatService = async (
  sessionId: string,
  userMessage: string
) => {

  const session = await DebugSession.findById(sessionId)
  if (!session) throw new Error('No Session Found!')
  const history = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 })
  const systemPropmpt = generateChatSystemPrompt(session.errorMessage, session.codeSnippet!, session.context!)
  const historymessages = history.map(chatHistory => {
    return {
      role: chatHistory.role,
      content: chatHistory.message
    }
  })

  const messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[] = [{ role: 'system', content: systemPropmpt }, ...historymessages, { role: 'user', content: userMessage }]


  const aiReplyRaw = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.3,
  })

  const aiReply = aiReplyRaw.choices[0]?.message.content || "Unable to generate Response, Please try Again!"
  await ChatMessage.create([{
    sessionId, role: 'user', message: userMessage
  },
  {
    sessionId, role: 'assistant', message: aiReply
  }
  ])
  return aiReply
}

export const getAllChatsBySessionIdSVC = async (sessionId: string) => {
  return chatModel.find({ sessionId }).sort({ createdAt: 1 })
}