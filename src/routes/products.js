import express from "express";
import { productModel } from "../models/products-schema.js";
const router = express.Router();


router.get("/", (req, res)=>{
  res.send("welcome to products")
})

router.post("/", async (req, res)=>{
  
  try {
    const product = new productModel({
      name: req.body.name
    })

    await product.save().then(()=>{
      res.status(200)
      res.send("product created")
    })
  } catch (error) {
    console.log(error)
  }
})


export default router;