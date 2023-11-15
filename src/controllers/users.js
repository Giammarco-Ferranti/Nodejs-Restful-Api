import { v4 as uuidv4 } from 'uuid';

//finto db
let users = [];


export const getAllUsers = (req,res)=>{
  res.send(users)
};

export const getUser = (req,res)=>{
  const { id } = req.params
  // const { name } = req.body
  const userFind = users.find((user)=> user.id === id)
  res.send(userFind)
};


export const createUser = (req,res)=>{
  const user = req.body
  //cambiato in db 
  users.push({...user,id: uuidv4()})
  console.log(users)
  //risposta all'utente
  res.send(`user with the name of ${user.name} has been created`)
};


export const updateUser = (req,res)=>{
  const { id } = req.params
  const { name } = req.body
  const userFind = users.find((user)=> user.id === id)

  if(name) userFind.name = name;
  res.send("user has been updated")
};

export const deleteUser = (req,res)=>{
  const { id } = req.params
  users = users.filter((user)=> user.id !== id)
  res.send("user has been deleted")
};