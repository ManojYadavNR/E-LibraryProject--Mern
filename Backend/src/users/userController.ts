import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModels from "./userModels.ts";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const { sign } = jwt;

import { config } from "../config/config.ts";


const UserCreate =async(req:Request,res:Response,next:NextFunction)=>{

    const {name,email,password}= req.body


    if(!name || !email || !password){
        const error = createHttpError(400,"All fields are required")
        return next(error)
    }
    
    const user = await userModels.findOne({email})
    if(user){
        const error= createHttpError(400,"user already exist with this email")
        return next(error)
    }
   const hashedPassword= await bcrypt.hash(password,10)
   

   const newUser= await userModels.create({
    name,
    email,
    password:hashedPassword
   })

   const token = sign({sub:newUser._id},config.jwtSecret as string,{expiresIn:"7d"})
 return res.json({message:"user Created",
    accesstoken:token
 })

}
export {UserCreate};