import express from "express";
import router from "./routes/users.js"
import bodyParser from "body-parser";

const app = express();
const userRoute = router;

app.use(bodyParser.json())

app.use("/users", userRoute)


app.listen(4040, ()=>{
  console.log("server hi")
})