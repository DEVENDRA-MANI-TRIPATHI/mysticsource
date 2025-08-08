import mongoose from "mongoose";

type connectionObject = {
    isConnected?:number
}

const connection: connectionObject = {}


async function dbConnect(): Promise<void> {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }
    
    if (connection.isConnected) {
        console.log("Already Connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI)
        
        connection.isConnected = db.connections[0].readyState
        
        console.log("DB is connected")
    } catch (error) {
        console.log("Database connection Failed",error);
        process.exit(1);
    }
}

export default dbConnect;