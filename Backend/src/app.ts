import express from "express";
import globalerrorhandler from "./middleware/globalerrorhandler.ts";

const app=express()


app.get("/",(req,res)=>{
    // const error = createHttpError(400,"something went wrong")
    // throw error
    res.json({message:" well come to elib"})
})

app.use(globalerrorhandler)
export default app;