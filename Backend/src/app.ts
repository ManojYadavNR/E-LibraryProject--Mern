import express from "express";
import  globalerrorhandler from "./middleware/globalerrorhandler.ts";
import  userRouter from "./users/userRoute.ts";
import  BookRouter from "./Books/BookRoute.ts";

const app=express()
app.use(express.json())


app.get("/",(req,res)=>{
    // const error = createHttpError(400,"something went wrong")
    // throw error
    res.json({message:" well come to elib"})
})
app.use("/api/users",userRouter)
app.use("/api/Books",BookRouter)
app.use(globalerrorhandler)
export default app;