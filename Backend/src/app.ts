import express from "express"

const app=express()


app.get("/",(req,res)=>{
    res.json({message:" well come to elib"})
})
export default app;