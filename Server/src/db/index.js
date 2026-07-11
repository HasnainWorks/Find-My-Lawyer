import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const ConnectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_STRING}${process.env.DB_NAME}`)
        console.log('DataBase connected');
        
    } catch (error) {
        console.log('DataBase connection error!!!',error);
        throw error
    }

}

export {ConnectDB}

