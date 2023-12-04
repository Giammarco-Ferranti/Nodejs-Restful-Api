
import mongoose from 'mongoose';
import _ from "lodash";
import { userModel } from '../models/user-schema.js';
const ObjectId = mongoose.Types.ObjectId;



export const getAllUsers = async (req, res)=>{
  try {
    const allUsers = await userModel.find()

    return _.isEmpty(allUsers) ?  
    res.status(400).send("No users") :  
    res.status(200).send(allUsers);

  } catch (error) {
    if(error){
      res.status(500).send("server error")
    }
    
  }
}


export const getUser = async (req,res)=>{
  try {
  const id = req.params.id; 

  if(!ObjectId.isValid(id)){
    res.status(400).send("User not found, wrong id");
    return;
  }

  const userFind = await userModel.findById(id);

  return !userFind ? 
  res.status(400).send("user not found") :
  res.status(200).send(userFind) ;

  } catch (error) {
    if(error){
      res.status(500).send(error);
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
      res.status(200).send(`New user created with the name of ${user.name} and with the id: ${user._id}`);
    });

  } catch (error) {
    switch (true) {

      case error.name === "ValidationError" : 
      res.status(400).send(error.message)
      break;
      
      case error.message.includes("E11000") : 
      res.status(400).send("Email already taken")
      break;

      default: 
      res.status(500).send("Something went wrong")
      break;
    }
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
    
    if(Object.values(data).includes("") === true){
      res.status(400);
      res.send("A field is required");
        return;
    }
    
    const userFind = await userModel.findByIdAndUpdate(id, data);
    
    return !userFind ?
    res.status(400).send("User not found") :
    res.status(200).send("user updated");
    
  } catch (error) {
    if(error){
      res.status(500).send(error.message);
    }
  };

};


export const deleteUser = async (req,res)=>{
  try {
    const id  = req.params.id;
    const userFind = await userModel.findByIdAndDelete(id);
    
    return !userFind ?
    res.status(400).send("The user has not been found") :
    res.status(200).send("User deleted");
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};