import express from "express";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();


let users = [];

router.get("/", (req,res)=>{
  res.send(users)
})

router.post("/", (req,res)=>{

const user = req.body

users.push({...user,id: uuidv4()})
console.log(users)

res.send(`user with the name of ${user.name} has been created`)
})


router.patch("/:id", (req,res)=>{
  const { id } = req.params
  const { name } = req.body
  const user = users.find((user)=> user.id === id)

  if(name) user.name = name;
  res.send("user has been updated")
})



router.delete("/:id", (req,res)=>{

  const { id } = req.params
  users = users.filter((user)=> user.id !== id)
  res.send("user has been deleted")
})


export default router