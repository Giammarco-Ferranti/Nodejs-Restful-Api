import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;


const orders = new Schema ({
  product: {
    type: [String], 
    validate: v => Array.isArray(v) && v.length > 0,
  },
  user: {
    type: Schema.Types.ObjectId
  }, 
  date: {type: Date, default: Date.now}
})


export const ordersModel = mongoose.model("order", orders)