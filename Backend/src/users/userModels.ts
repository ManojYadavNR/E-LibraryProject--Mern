import mongoose from "mongoose";
import type { user } from "./userTypes.js";



const userSchema= new mongoose.Schema<user>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})
 export default mongoose.model<user>("user",userSchema)