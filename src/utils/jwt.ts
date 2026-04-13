import jwt from 'jsonwebtoken'
import env from '../environments/env'
export const generateAccessToken = (userId: string) => {
  if (!env.jwt_secret) {
    console.log("jwt secret not found!")
    return null
  }
  return {
    accessToken: jwt.sign({ userId }, env.jwt_secret, {
      expiresIn: '7d'
    }), expriresAT: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  }
}


export const generateRefreshAccessToken = (userId: string) => {
  if (!env.jwt_secret) {
    console.log("jwt secret not found!")
    return null
  }
  return jwt.sign({ userId }, env.jwt_secret, {
    expiresIn: '7d'
  })
}

