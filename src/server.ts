import app from "./app";
import env from './environments/env'
import connectDB from "./config/db";
const port = env.port

app.listen(port, () => {
  connectDB()
  console.log("app is running on port: ", port)
})