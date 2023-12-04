import express from "express";
import userRouter from "./routes/users.js"
import productRouter from "./routes/products.js"
import ordersRoute from "./routes/orders.js"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { dbConnection } from "./db/connection.js";



const app = express();
const userRoute = userRouter;
const productRoute = productRouter;

dotenv.config({path: ".env"})
const PORT = process.env.PORT

dbConnection()

app.use(bodyParser.json())


app.use("/users", userRoute)
app.use("/products", productRoute)
app.use("/orders", ordersRoute)

app.use("/", (req,res)=>{
  res.send("connected to the api")
})

//server
app.listen(PORT, ()=>{
  console.log("Server connected")
})
