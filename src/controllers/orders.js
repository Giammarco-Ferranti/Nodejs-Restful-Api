import mongoose from "mongoose";
import _ from "lodash";
import { ordersModel } from "../models/orders-schema.js";
const ObjectId = mongoose.Types.ObjectId;


export const getAllOrders = async(req, res)=>{
  try {
    const allOrders = await ordersModel.find()

    return _.isEmpty(allOrders) ?
    res.status(400).send("No orders") : 
    res.status(200).send(allOrders);

  } catch (error) {
  if(error){
    res.status(500).send("Server error");
  }
  }
}


export const getOrdersByProduct = async (req, res)=>{
  try {
  
    const product_id = req.params.id

    if(!ObjectId.isValid(product_id)){
      res.status(400).send("Order not found, wrong id");
      return;
    }

    const orderFind = await ordersModel.find({product: product_id}).exec()

    return !orderFind ?
    res.status(400).send("Order not found") :
    res.status(200).send(orderFind);

  } catch (error) {
    if(error){
      res.status(500).send("Server error");
    }
  }
}

export const getLatestOrders = async(req, res)=>{
  try {
    const latestOrders = await ordersModel.find().sort({date: -1})
    
    return !latestOrders ?
    res.status(400).send("No orders") :
    res.status(200).send(latestOrders);

  } catch (error) {
    if(error){
      res.status(500).send("Server error");
    }
  }
}

export const getFirstOrders = async(req, res)=>{
  try{
    const firstOrders = await ordersModel.find().sort({date: 1})
      
    return !firstOrders ?
    res.status(400).send("No orders") :
    res.status(200).send(firstOrders);

  } catch (error) {
    if(error){
      res.status(500).send("Server error");
    }
  }
}

export const getOrder = async (req,res)=>{
  try {
    const id = req.params.id;
    
    if(!ObjectId.isValid(id)){
      res.status(400).send("Order not found, wrong id");
      return;
    }
    
    const orderFind = await ordersModel.findById(id);
    
    return !orderFind ?
    res.status(400).send("Order not found") :
    res.status(200).send(orderFind);
  
    } catch (error) {
      if(error){
        res.status(500).send(error.message);
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
        res.status(400).send("Order invalid, values cannot be empty");
        return
      }

      if (order.user.includes("") == true){
        res.status(400).send("Order invalid, user cannot be empty");
        return
      }

    await order.save().then(()=>{
      res.status(200)
      res.send(`Order created with the id ${order._id}`)
    })
    
  } catch (error) {
    return error.name === "ValidationError" ?
    res.status(400).send(error.message) :
    res.status(500).send("Something went wrong");
  }
  }



export const updateOrder = async (req,res)=>{
  try {
    const id  = req.params.id;
  
    const data = {
      product: req.body.product
    };

    if(Object.values(data).includes("") === true){
      res.status(400);
      res.send("A field is required");
      return;
    }

    const orderFind = await ordersModel.findByIdAndUpdate(id, data);

    return !orderFind ?
    res.status(400).send("Order not found") :
    res.status(200).send("Order updated");   

  } catch (error) {
    if(error){
      res.status(500).send(error.message);
    }
  };

};


export const deleteOrder = async (req,res)=>{
  try {
    const id  = req.params.id;
    const orderFind = await ordersModel.findByIdAndDelete(id);
  
    return !orderFind ?
    res.status(400).send("the order has not been found") :
    res.status(200).send("order deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};