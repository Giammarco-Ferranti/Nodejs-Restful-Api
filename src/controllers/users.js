
import mongoose from 'mongoose';
import _ from 'lodash';
import { userModel } from '../models/user-schema.js';
const ObjectId = mongoose.Types.ObjectId;


export const getUser = async (req,res)=>{
  try {
  const id = req.params.id
  
  if(!ObjectId.isValid(id)){
    res.status(400)
    res.send("User not found, try adjusting the id")
    return
  }
  
  const userFind = await userModel.findById(id)

  if(userFind){
    res.status(200)
    res.send(userFind)
  }else{
    res.status(400)
    res.send("User not found")
  }
   
    
  } catch (error) {
    if(error){
      res.status(500)
      res.send(error)
    }
  }
};



export const createUser = async (req,res)=>{
  try {
    console.log(req.body)

    // if(_.isEmpty(req.body)){
    //   res.status(400)
    //   res.send("Data not correct. Name, surname and email are required.")
    //   return
    // }

    console.log(req.body)

    const user = new userModel({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    })

    if(user == error){
      console.log(error)
    }
    
    await user.save().then(()=>{
        res.status(200)
        res.send(`New user create with the name of ${user.name}`)
      })  
  } catch (error) {
    res.send(error)
    //  if(error){
    //   res.status(400)
    //   res.send(error.name.message)
    //   res.send(error.surname.message)
    //   res.send(error.email.message)
      
    // }
  }
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
};

export const deleteUser = async (req,res)=>{
  const id  = req.params.id
  const userFind = await userModel.findByIdAndDelete(id)
  res.send("User deleted")
};