import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";


const BookCreate= async(req:Request,res:Response,next:NextFunction)=>{

    res.json({message:"Book created"})
}

export {BookCreate};