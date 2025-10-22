
import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config.ts";
const { verify } = jwt;


export interface AuthRequest extends Request{
    userId:string
}
const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
      
    const token= req.header('Authorization')
    if(!token){
        return next(createHttpError(401,"token required!!"))
    }

    

    
     try {
        const parseToken= token.split(" ")[1]
        const decode= verify(parseToken,config.jwtSecret as string)
         const _req= req as AuthRequest
     _req.userId= decode.sub as string
     next()
     } catch (error) {
        return next(createHttpError(401,"token expired"))
     }


    
}

export default authMiddleware;