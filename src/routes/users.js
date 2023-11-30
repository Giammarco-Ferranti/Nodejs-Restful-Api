import express from "express";
import {getUser, createUser, updateUser, deleteUser, getAllUsers } from "../controllers/users.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;