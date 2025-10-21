import mongoose from "mongoose"
import { config } from "./config.ts";


const Connection =async()=>{
    try {


        mongoose.connection.on("connected",()=>{
            console.log("mongoDb connected")
        })

         mongoose.connection.on("error",(err)=>{
            console.log("error in connecting to db",err)
        })
        await mongoose.connect(config.mongodb as string)


    } catch (error) {
        console.error("failed to connect",error)
        process.exit(1)
    }
}

export default Connection;