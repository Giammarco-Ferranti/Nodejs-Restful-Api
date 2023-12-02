import mongoose from "mongoose";
import _ from "lodash";
import { ordersModel } from "../models/orders-schema.js";
const ObjectId = mongoose.Types.ObjectId;


export const getAllOrders = async(req, res)=>{
  try {
    const allOrders = await ordersModel.find()

    if(_.isEmpty(allOrders)){
      res.status(400)
      res.send("No orders")
      return
    }

   if(allOrders) {
      res.status(200)
      res.send(allOrders)
    }

  } catch (error) {
  if(error){
    res.status(500)
    console.log(error)
    res.send("Server error")
  }
  }
}


export const getOrdersByProduct = async (req, res)=>{
  try {
    
    const product_id = req.params.id

    if(!ObjectId.isValid(product_id)){
      res.status(400);
      res.send("Order not found, wrong id");
      return;
    }

    const orderFind = await ordersModel.find({product: product_id}).exec()

    if(orderFind){
      res.status(200)
      res.send(orderFind)
    }
    

  } catch (error) {
    if(error){
      res.status(500)
      console.log(error)
      res.send("Server error")
    }
  }
}

export const getLatestOrders = async(req, res)=>{
  try {
    const latestOrders = await ordersModel.find().sort({date: -1})
    
    if(latestOrders){
      res.status(200)
      res.send(latestOrders)
    }
    
    
  } catch (error) {
    if(error){
      res.status(500)
      console.log(error)
      res.send("Server error")
    }
  }
}

export const getFirstOrders = async(req, res)=>{
  try{
    const firstOrders = await ordersModel.find().sort({date: 1})
      
      if(firstOrders){
        res.status(200)
        res.send(firstOrders)
      }

  } catch (error) {
    if(error){
      res.status(500)
      console.log(error)
      res.send("Server error")
    }
  }
}

export const getOrder = async (req,res)=>{
  try {
    const id = req.params.id;
    
    if(!ObjectId.isValid(id)){
      res.status(400);
      res.send("Order not found, wrong id");
      return;
    }
    
    const orderFind = await ordersModel.findById(id);
  
    if(orderFind){
      res.status(200);
      res.send(orderFind);
    }
  
    if(!orderFind){
      res.status(400);
      res.send("Order not found");
    }
  
    } catch (error) {
      if(error){
        res.status(500);
        res.send(error.message);
      };
    };
}


export const createOrder = async (req, res)=>{
  try {
    const order = new ordersModel ({
      product: req.body.product,
      user: req.body.user
    }) 

    if (order.product.includes("") == true){
      res.status(400)
      res.send("Order invalid, product cannot be empty")
      return
    }
    await order.save().then(()=>{
      res.status(200)
      res.send(`Order created with the id ${order._id}`)
    })
    
  } catch (error) {
    if(error.name === "ValidationError"){
      res.status(400);
      res.send(error.message);
      return;
    }
    console.log(error)
    res.status(500).send("Something went wrong");
  }
  }



export const updateOrder = async (req,res)=>{
  try {
    const id  = req.params.id;
  
    const data = {
      product: req.body.product
    };

    const orderFind = await ordersModel.findByIdAndUpdate(id, data);

    if(data.product.includes("") == true){
      res.status(400);
      res.send("A field is required");
      return;
    }

    if(orderFind){
      res.status(200);
      res.send("Order updated");
    }
    
    
  } catch (error) {
    if(error){
      res.status(500)
      res.send(error.message)
    }
  };

};


export const deleteOrder = async (req,res)=>{
  try {
    const id  = req.params.id;
    const orderFind = await ordersModel.findByIdAndDelete(id);
  
    if(!orderFind){
      res.status(400)
      res.send("the order has not been found")
      return
    }else{
      res.status(200)
      res.send("order deleted");
    }
    
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
};