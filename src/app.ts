import express from 'express'
import cors from 'cors'
import authRoutes from './modules/auth/auth.routes'
import sessionRouter from './modules/session/session.routes'
import aiRoute from './modules/ai/ai.routes'
import chatRouter from './modules/chat/chat.route'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/sessions', sessionRouter)
app.use('/api/ai', aiRoute)
app.use('/api/chat', chatRouter)

app.get('/', (_req, res) => {
  res.send("server is running")
})

export default app