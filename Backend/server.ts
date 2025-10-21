import { config } from "./src/config/config.ts";
import app from "./src/app.ts"

const serverConnection = ()=>{
    const port= config.port || 3000;

    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })
}
serverConnection()