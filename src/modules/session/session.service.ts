import DebugSessionModel from './session.model'
export const createSession = async (data: any, userId: string) => {
  return await DebugSessionModel.create({ ...data, userId })
}

export const getSeassions = async (userId: string) => {
  return await DebugSessionModel.find({ userId }).sort({ createdAt: -1 })
}

export const getSeassionById = async (id: string, userId: string) => {
  return await DebugSessionModel.findOne({ _id: id, userId })
}

export const deleteSessionById = async (id: string, userId: string) => {
  return await DebugSessionModel.findOneAndDelete({
    _id: id, userId
  })
}