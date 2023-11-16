import express from "express";
import router from "./routes/users.js"
import bodyParser from "body-parser";
import mongoose from "mongoose";


mongoose.connect("mongodb+srv://ferrantigiammarco:Giammi@cluster0.9h0qhc3.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("connected"))
const app = express();
const userRoute = router;

//usare json in tutto il codice
app.use(bodyParser.json())

//user url
app.use("/users", userRoute)

app.use("/", (req,res)=>{
  res.send("connected to the api")
})


//server
app.listen(4040, ()=>{
  console.log("server hi")
})