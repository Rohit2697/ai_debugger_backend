import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { chatService, deleteChatsBySessionIdSVC, getAllChatsBySessionIdSVC } from "./chat.service";
export const chatController = async (req: AuthRequest, res: Response) => {
  try {
    const reply = await chatService(req.params.sessionId as string, req.body.message)
    res.json({ reply })
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const getChatsBySessionId=async(req:AuthRequest,res:Response)=>{
  try{
    const chats=await getAllChatsBySessionIdSVC(req.params.sessionId as string)
    return res.json(chats)
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }
}

export const deleteChatsBySessionId=async(req:AuthRequest,res:Response)=>{
  try{
    await deleteChatsBySessionIdSVC(req.params.sessionId as string) 
    return res.json({message:"Deleted"})
  } catch (err: any) {
    return res.status(500).json({ message: err.message })
  }   
}