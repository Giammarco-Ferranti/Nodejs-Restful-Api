import mongoose from "mongoose";

const Schema = mongoose.Schema;


const orders = new Schema ({
  product: {
    type: Schema.Types.ObjectId
  },
  user: {
    type: Schema.Types.ObjectId
  }
})


export const ordersModel = mongoose.model("order", orders)