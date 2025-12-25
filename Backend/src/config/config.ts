import {config as conf} from "dotenv"

conf()
const _config ={
    port:process.env.Port,
    mongodb:process.env.MongoDb,
    env:process.env.Node_ENV,
    jwtSecret:process.env.jwtsecret,
    cloudinary_name:process.env.Cloudinary_name,
    cloudinary_api_key:process.env.Cloudinary_api_key,
    cloudinary_api_secret:process.env.Cloudinary_api_secret,
    Frontend_Url:process.env.url
}

export const config = Object.freeze(_config)