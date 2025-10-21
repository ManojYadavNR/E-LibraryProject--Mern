import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";


const UserCreate =(req:Request,res:Response,next:NextFunction)=>{

    const {name,email,password}= req.body

    if(!name || !email || !password){
        const error = createHttpError(400,"All fields are required")
        return next(error)
    }
    
    res.json({
        message:"User created"
    })

}
export {UserCreate};