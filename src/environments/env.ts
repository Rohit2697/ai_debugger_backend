import * as dotenv from 'dotenv'
dotenv.config()

const env={
  "mongo_url": process.env.MONGO_URI,
  "port":process.env.PORT,
  "jwt_secret":process.env.JWT_SECRET,
  "open_ai_api_key": process.env.OPEN_AI_KEY
}

export default env
