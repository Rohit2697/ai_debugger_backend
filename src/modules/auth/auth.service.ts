
import bcrypt from 'bcrypt'
import { User } from './auth.model'
export const signup = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 8)
  const user = await User.create(
    {
      email, password: hashedPassword
    }
  )

  return user

}

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('User Not Found!')

  if (! await bcrypt.compare(password, user.password)) throw new Error('invalid credentials!')

  return user
}