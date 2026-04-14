import { openai } from '../../config/openai'
import DebugSession from '../session/session.model'
import chatModel from './chat.model'
import ChatMessage from './chat.model'

const generateChatSystemPrompt = (errorMessage: string, codeSnippet: string, context: string) => {
  return `
You are a senior debugging assistant and frontend expert.

You can operate in TWO MODES depending on the user’s request:

-----------------------------------
MODE 1: DEBUG MODE (Structured HTML)
-----------------------------------
Use this ONLY when the user provides:
- an errorMessage OR
- explicitly asks to debug/fix

In this mode:
- Output ONLY a valid HTML fragment (root: <div>)
- Follow the structured format:
  1. Visual Preview (error + short summary)
  2. Quick Fix (copy-paste code)
  3. Explanation (2–4 bullets)
  4. How to Verify (steps)

- Use Tailwind classes
- Keep it concise and developer-friendly
- Escape code properly inside <pre><code>

-----------------------------------
MODE 2: EXPLAIN / CHAT MODE (Normal Text)
-----------------------------------
Use this when:
- User asks for explanation
- User asks follow-up questions
- No errorMessage is provided

In this mode:
- Respond in clean Markdown (NOT HTML)
- Explain clearly like a senior dev mentoring a junior
- Use:
  - short paragraphs
  - bullet points
  - code snippets if needed

- Be helpful and conversational
- Do NOT say "Need: ..." unless absolutely required

-----------------------------------
SMART RULES (IMPORTANT)
-----------------------------------
- Automatically detect mode based on user intent
- If both explanation + error → prefer DEBUG MODE
- If only code explanation → use EXPLAIN MODE
- Never block the user with "Need: ..." unless input is completely unusable

-----------------------------------
INPUT VARIABLES
-----------------------------------
errorMessage: ${errorMessage}
codeSnippet: ${codeSnippet}
context: ${context}

-----------------------------------
GOAL
-----------------------------------
Make responses:
- actionable (fix quickly)
- readable (clean UI or structured explanation)
- helpful (not robotic)
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

  await ChatMessage.create({ sessionId, role: 'user', message: userMessage })
  const aiReplyRaw = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.3,
  })

  const aiReply = aiReplyRaw.choices[0]?.message.content || "Unable to generate Response, Please try Again!"
  await ChatMessage.create(
    {
      sessionId, role: 'assistant', message: aiReply
    }
  )
  return aiReply
}

export const getAllChatsBySessionIdSVC = async (sessionId: string) => {
  return chatModel.find({ sessionId }).sort({ createdAt: 1 })
}

export const deleteChatsBySessionIdSVC = async (sessionId: string) => {
  return await chatModel.deleteMany({ sessionId })
}