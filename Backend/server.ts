import { config } from "./src/config/config.ts";
import app from "./src/app.ts"
import connection from "./src/config/Db.ts"

const serverConnection = async()=>{
    await connection()
    const port= config.port || 3000;

    app.listen(port,()=>{
        console.log(`server is running on ${port}`)
    })
}
serverConnection()