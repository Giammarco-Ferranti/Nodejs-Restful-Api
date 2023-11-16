
import mongoose from 'mongoose';
import { userModel } from '../models/user-schema.js';
const ObjectId = mongoose.Types.ObjectId;


export const getUser = async (req,res)=>{
  const id = req.params.id
  const userFind = await userModel.findById(id)
  res.send(userFind)
  // const userFind = users.find((user)=> user.id === id)
  // res.send(userFind)
};


export const createUser = (req,res)=>{
  const user = new userModel({
    name: req.body.name,
    surname: req.body.surname,
    // email: req.body.email,
  })
  user.save().then(()=>{
    res.send(`New user create with the name of ${user.name}`)
  })
};


export const updateUser = async (req,res)=>{
  const id  = req.params.id

  const data = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  };

  const userFind = await userModel.findByIdAndUpdate(id, data)
  res.send(userFind)
  // const userFind = userModel.findById(id)
  // res.send(`${userFind}`)
};

export const deleteUser = async (req,res)=>{
  const id  = req.params.id
  const userFind = await userModel.findByIdAndDelete(id)
  res.send("User deleted")
  // users = users.filter((user)=> user.id !== id)
  // res.send("user has been deleted")
};