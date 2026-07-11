import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
import { ConnectDB } from "./src/db/index.js";
import app from "./app.js";

ConnectDB().then(() => {
    app.listen(process.env.PORT,() => {
        console.log(`Server is running on PORT:${process.env.PORT}`);
    })
}).catch(() => {
    console.log('error occured');
})