import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModels from "./userModels.ts";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const { sign } = jwt;

import { config } from "../config/config.ts";
import type { user } from "./userTypes.ts";


const UserCreate =async(req:Request,res:Response,next:NextFunction)=>{

    const {name,email,password}= req.body


    if(!name || !email || !password){
        const error = createHttpError(400,"All fields are required")
        return next(error)
    }
    try {
        const user = await userModels.findOne({email})
        if(user){
        const error= createHttpError(400,"user already exist with this email")
        return next(error)
    }
        
    } catch (err) {
        return next(createHttpError(400,"error while finding the user"),)
    }

   const hashedPassword= await bcrypt.hash(password,10)
   let newUser:user
   try {
    newUser= await userModels.create({
    name,
    email,
    password:hashedPassword
   })
   } catch (error) {
    return next(createHttpError(400,"error while creating the user"),)
   }

   try {
       const token = sign({sub:newUser._id},config.jwtSecret as string,{expiresIn:"7d"})
 return res.json({message:"user Created",
    accesstoken:token
 })
   } catch (error) {
    return next(createHttpError(400,"Error while creating token"))
   }



}


const UserLogin= async(req:Request,res:Response,next:NextFunction)=>{
    
    const {email,password}=req.body

    if(!email || !password){
        return next(createHttpError(400,"all fields are required"))
    }
    
    const user = await userModels.findOne({email})
    if(!user){
        return next(createHttpError(404,"unser not exist"))
    }
     const ismatch = await bcrypt.compare(password,user.password)

     if(!ismatch){
        return next(createHttpError(400,"invalid email or password"))
     }
try {
     const token = sign({sub:user._id},config.jwtSecret as string,{expiresIn:"7d"})
 return res.json({message:"user Created",
    accesstoken:token})
} catch (error) {
    return next(createHttpError(400,"error while joken sign"))
}

   
}
export {UserCreate,UserLogin};