import { ObjectId } from "mongodb";
import mongoose from "mongoose";


const Schema = mongoose.Schema;


const userSchema = new Schema ({
name: {type: String, required: true},
surname: {type: String, required: true},
email: {type: String, required: true}
});

export const userModel = mongoose.model('user', userSchema)