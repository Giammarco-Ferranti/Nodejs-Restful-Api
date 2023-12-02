import express from "express";
import { createOrder, getAllOrders, getOrder, updateOrder, deleteOrder, getLatestOrders, getFirstOrders, getOrdersByProduct } from "../controllers/orders.js";
const router = express.Router();


router.get("/", getAllOrders)
router.get("/product/:id", getOrdersByProduct)
router.get("/desc/date", getLatestOrders)
router.get("/asc/date", getFirstOrders)
router.get("/:id", getOrder)
router.post("/", createOrder)
router.patch("/:id", updateOrder)
router.delete("/:id", deleteOrder)


export default router;