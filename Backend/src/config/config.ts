import {config as conf} from "dotenv"
conf()
const _config ={
    port:process.env.Port,
    mongodb:process.env.MongoDb,
    env:process.env.Node_ENV
}

export const config = Object.freeze(_config)