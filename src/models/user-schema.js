
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  
name: {
type: String, 
required: [true, "A name is required"]
},

surname: {
type: String, 
required: [true, "A surname is required"]
},

email: {
type: String, 
required: [true, "An email is required"]
}
});

export const userModel = mongoose.model('user', userSchema);