import OpenAI from 'openai'
import env from '../environments/env'

export const openai = new OpenAI(
  {
    apiKey: env.open_ai_api_key
  }
)
