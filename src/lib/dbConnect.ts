import mongoose from "mongoose";    // ORM tool that connect js application with mongodb
import dotenv from 'dotenv';        // // The dotenv package is a Node.js library that allows you to load environment variables from a .env file into process.env.

//The config() method reads the .env file in the root directory of your project.
//It parses the file's content and attaches the key-value pairs to process.env.
dotenv.config();    

type ConnectionObject = {
  //data type
  isConnected?: number;
};
// const MONGODB_URI='mongodb://root:root@cluster0.blfaipp.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0'
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {

  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
