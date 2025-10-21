import { HttpError } from "http-errors";
import { config } from "../config/config.ts";
import { NextFunction, Request, Response } from "express";

const globalerrorhandler=(err:HttpError,req:Request,res:Response,next:NextFunction )=>{
    const statuscode = err.statusCode || 500;

    return res.status(statuscode).json({
        message:err.message,
        errorstack:config.env == "development" ? err.stack : " "
    })
}
export default globalerrorhandler