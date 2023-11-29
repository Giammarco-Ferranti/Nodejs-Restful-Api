import express from "express";
import { ordersModel } from "../models/orders-schema.js";
const router = express.Router();

router.get("/:id", async (req, res)=>{
  try {
    const id = req.params.id;
    
    const orderFind = await ordersModel.findById(id);
  
    if(orderFind){
      res.status(200);
      res.send(orderFind);
    }
  
    } catch (error) {
    
}
})

router.post("/", async (req, res)=>{
  try {
    const order = new ordersModel ({
      product: req.body.product,
      user: req.body.user
    }) 
    
    await order.save().then(()=>{
      res.status(200)
      res.send("order created")
    })
    
  } catch (error) {
    
  }
})


export default router;