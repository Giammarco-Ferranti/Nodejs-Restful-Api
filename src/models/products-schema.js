import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: [true]
}
})

export const productModel = mongoose.model("product", productSchema)
