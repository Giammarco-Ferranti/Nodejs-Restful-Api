import express from "express";
import { productModel } from "../models/products-schema.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/products.js";
const router = express.Router();


router.get("/", getAllProducts)
router.get("/:id", getProduct)
router.post("/", createProduct)
router.patch("/:id", updateProduct)
router.delete("/:id", deleteProduct)


export default router;