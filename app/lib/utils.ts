import mongoose from "mongoose";

interface Connection {
  isConnected?: number; // or boolean, depending on the readyState type
}

const connection: Connection = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect("mongodb://alwirifa611:alwi@ac-szrz4im-shard-00-00.qc0ob3y.mongodb.net:27017,ac-szrz4im-shard-00-01.qc0ob3y.mongodb.net:27017,ac-szrz4im-shard-00-02.qc0ob3y.mongodb.net:27017/?ssl=true&replicaSet=atlas-gdkifp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    const errorMessage = typeof error === "string" ? error : JSON.stringify(error);
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};
