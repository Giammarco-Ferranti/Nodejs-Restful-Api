import express from "express";
import userRouter from "./routes/users.js"
import productRouter from "./routes/products.js"
import ordersRoute from "./routes/orders.js"
import bodyParser from "body-parser";
import mongoose from "mongoose";


mongoose.connect("mongodb+srv://ferrantigiammarco:Giammi@cluster0.9h0qhc3.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("connected"))
const app = express();
const userRoute = userRouter;
const productRoute = productRouter;

//usare json in tutto il codice
app.use(bodyParser.json())


app.use("/users", userRoute)

app.use("/products", productRoute)

app.use("/orders", ordersRoute)

app.use("/", (req,res)=>{
  res.send("connected to the api")
})


//server
app.listen(4040, ()=>{
  console.log("server hi")
})