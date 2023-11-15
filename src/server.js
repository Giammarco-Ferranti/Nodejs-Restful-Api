import express from "express";
import router from "./routes/users.js"
import bodyParser from "body-parser";

const app = express();
const userRoute = router;

//usare json in tutto il codice
app.use(bodyParser.json())

//user url
app.use("/users", userRoute)


//server
app.listen(4040, ()=>{
  console.log("server hi")
})