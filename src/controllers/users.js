
import mongoose from 'mongoose';
import _ from "lodash";
import { userModel } from '../models/user-schema.js';
const ObjectId = mongoose.Types.ObjectId;



export const getAllUsers = async (req, res)=>{
  try {
    const allUsers = await userModel.find({})

    if(_.isEmpty(allUsers)){
      res.status(400)
      res.send("No users")
      return
    }

    if(allUsers) {
       res.status(200)
       res.send(allUsers)
     }


  } catch (error) {
  if(error){
    res.status(500)
    console.log(error)
    res.send("Server error")
  }
  }
}


export const getUser = async (req,res)=>{
  try {
  const id = req.params.id;
  
  if(!ObjectId.isValid(id)){
    res.status(400);
    res.send("User not found, wrong id");
    return;
  }
  
  const userFind = await userModel.findById(id);

  if(userFind){
    res.status(200);
    res.send(userFind);
  }

  if(!userFind){
    res.status(400);
    res.send("user not found");
  }

  } catch (error) {
    if(error){
      res.status(500);
      res.send(error);
    };
  };
};



export const createUser = async (req,res)=>{
  try {
    const user = new userModel({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email
    });
    
    await user.save().then(()=>{
      res.status(200);
      res.send(`New user created with the name of ${user.name} and with the id: ${user._id}`);
    });
  } catch (error) {
    if(error.name === "ValidationError"){
      res.status(400);
      res.send(error.message);
      return;
    }

    if(error.message.includes("E11000")){
      res.status(400)
      res.send("Email already taken")
      return
    }

    console.log(error.message)
   
      
      res.status(500).send("Something went wrong");
  };
};


export const updateUser = async (req,res)=>{
  try {
    const id  = req.params.id;
  
    const data = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    };
    const userFind = await userModel.findByIdAndUpdate(id, data);

    if(data.name === "" || data.surname === "" || data.email === ""){
      res.status(400);
      res.send("A field is required");
      return;
    }

    if(userFind){
      res.status(200);
      res.send("user updated");
    }
    
    
  } catch (error) {
    if(error){
      res.status(500)
      res.send(error.message)
    }
  };

};


export const deleteUser = async (req,res)=>{
  try {
    const id  = req.params.id;
    const userFind = await userModel.findByIdAndDelete(id);
  
    if(!userFind){
      res.status(400)
      res.send("the user has not been found")
      return
    }else{
      res.status(200)
      res.send("User deleted");
    }
    
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
};