import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import validate from "mongoose-validator";



const Schema = mongoose.Schema;


const userSchema = new Schema ({
name: {
type: String, 
required: [true, "A name is required"]
// validate (name){
//   if(validator.isEmpty(value)){
//     throw new Error("Name cannot be empty")
//   }
// }
},
surname: {
type: String, 
required: [true, "A surname is required"]
// validate (value){
//   if(validator.isEmpty(value)){
//     throw new Error("Surname cannot be empty")
//   }
// }
},

email: {
type: String, 
required: [true, "A email is required"]
}
});

export const userModel = mongoose.model('user', userSchema)