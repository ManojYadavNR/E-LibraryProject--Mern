import express  from "express";
import { UserCreate, UserLogin } from "./userController.ts";


const userRouter= express.Router()


userRouter.post("/register",UserCreate)
userRouter.post("/login",UserLogin)


export default userRouter;