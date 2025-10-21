import express  from "express";
import { UserCreate } from "./userController.ts";


const userRouter= express.Router()


userRouter.post("/register",UserCreate)


export default userRouter;