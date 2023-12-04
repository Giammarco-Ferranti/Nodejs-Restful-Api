import mongoose from "mongoose";
import _ from "lodash";
import {productModel} from "../models/products-schema.js";
const ObjectId = mongoose.Types.ObjectId;


export const getAllProducts = async (req, res)=> {
  try {
    const allProducts = await productModel.find()

    return _.isEmpty(allProducts) ?  
    res.status(400).send("No products") :  
    res.status(200).send(allProducts);

  } catch (error) {
  if(error){
    res.status(500).send("Server error")
  }
  }
}


export const getProduct = async (req,res)=>{
  try {
    const id = req.params.id;
    
    if(!ObjectId.isValid(id)){
      res.status(400).send("Product not found, wrong id");
      return;
    }
    
    const productFind = await productModel.findById(id);

    return !productFind ?
    res.status(400).send("Product not found") :
    res.status(200).send(productFind);

  
    } catch (error) {
      if(error){
        res.status(500).send(error.message);
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

    switch (true){
      case error.name === "ValidationError":
      res.status(400).send(error.message);
      break;

      case error.message.includes("E11000"):
        res.status(400).send("Product with this name already created")
      break;

      default:
      res.status(500).send("Something went wrong");
      break;
    }
  }
}



export const updateProduct = async (req,res)=>{
  try {
    const id  = req.params.id;
  
    const data = {
      name: req.body.name
    };

    if(Object.values(data).includes("") === true){
      res.status(400).send("A field is required");
      return;
    }

    const productFind = await productModel.findByIdAndUpdate(id, data);

    return !productFind ?
    res.status(400).send("Product not found") :
    res.status(200).send("product updated");
    
  } catch (error) {
    if(error){
      res.status(500).send(error.message);
    }
  };

};




export const deleteProduct = async (req,res)=>{
  try {
    const id  = req.params.id;
    const productFind = await productModel.findByIdAndDelete(id);
    
    return !productFind ?
    res.status(400).send("the product has not been found") :
    res.status(200).send("product deleted");
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};