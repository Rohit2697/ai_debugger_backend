import jwt from 'jsonwebtoken'
import env from '../environments/env'
export const generateAccessToken = (userId: string) => {
  if (!env.jwt_secret) {
    console.log("jwt secret not found!")
    return null
  }
  return jwt.sign({userId}, env.jwt_secret, {
    expiresIn: '15m'
  })
}


export const generateRefreshAccessToken = (userId: string) => {
  if (!env.jwt_secret) {
    console.log("jwt secret not found!")
    return null
  }
  return jwt.sign({userId}, env.jwt_secret, {
    expiresIn: '7d'
  })
}

