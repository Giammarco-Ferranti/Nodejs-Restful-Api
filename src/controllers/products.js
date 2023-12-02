import mongoose from "mongoose";
import _ from "lodash";
import {productModel} from "../models/products-schema.js";
const ObjectId = mongoose.Types.ObjectId;


export const getAllProducts = async (req, res)=> {
  try {
    const allProducts = await productModel.find()

    if(_.isEmpty(allProducts)){
      res.status(400)
      res.send("No products")
      return
    }
    
   if(allProducts) {
      res.status(200)
      res.send(allProducts)
    }

  } catch (error) {
  if(error){
    res.status(500)
    console.log(error)
    res.send("Server error")
  }
  }
}


export const getProduct = async (req,res)=>{
  try {
    const id = req.params.id;
    
    if(!ObjectId.isValid(id)){
      res.status(400);
      res.send("Product not found, wrong id");
      return;
    }
    
    const productFind = await productModel.findById(id);
  
    if(productFind){
      res.status(200);
      res.send(productFind);
    }
  
    if(!productFind){
      res.status(400);
      res.send("Product not found");
    }
  
    } catch (error) {
      if(error){
        res.status(500);
        res.send(error.message);
      };
    };
}


export const createProduct = async (req, res)=>{
   
  try {
    const product = new productModel({
      name: req.body.name
    })

    await product.save().then(()=>{
      res.status(200)
      res.send(`product created with the name ${product.name} and the id ${product._id}`)
    })
  } catch (error) {
    if(error.name === "ValidationError"){
      res.status(400);
      res.send(error.message);
      return;
    }
    res.status(500).send("Something went wrong");
  }
}



export const updateProduct = async (req,res)=>{
  try {
    const id  = req.params.id;
  
    const data = {
      name: req.body.name
    };
    const productFind = await productModel.findByIdAndUpdate(id, data);

    if(data.name === ""){
      res.status(400);
      res.send("A field is required");
      return;
    }

    if(productFind){
      res.status(200);
      res.send("product updated");
    }
    
    
  } catch (error) {
    if(error){
      res.status(500)
      res.send(error.message)
    }
  };

};




export const deleteProduct = async (req,res)=>{
  try {
    const id  = req.params.id;
    const productFind = await productModel.findByIdAndDelete(id);
  
    if(!productFind){
      res.status(400)
      res.send("the product has not been found")
      return
    }else{
      res.status(200)
      res.send("product deleted");
    }
    
  } catch (error) {
    res.status(500)
    res.send(error.message)
  }
};