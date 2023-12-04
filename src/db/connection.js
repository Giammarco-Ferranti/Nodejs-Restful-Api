import mongoose from "mongoose"
import dotenv from "dotenv";


dotenv.config({path: ".env"})
const DB_CONNECTION = process.env.DB_CONNECTION




export const dbConnection = async ()=>{
  try {
    const connect = await mongoose.connect(DB_CONNECTION)
    console.log("Database connected")
  } catch (error) {
    console.log(error)
  }
}