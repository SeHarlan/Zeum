// lib/db.ts
import { handleServerError } from "@/utils/handleError";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Interface for global object to avoid TypeScript errors
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  // Ensure the global object has the mongoose property
  var mongoose: MongooseCache;
}

// Check if the global object already has the mongoose property, otherwise set it
global.mongoose = global.mongoose || { conn: null, promise: null };

let cached = global.mongoose;

async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable"
      );
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose.connection)
      .catch((err) => {

        handleServerError({
          error: err,
          location: "connectToDatabase",
        });
        
        cached.conn = null;
        cached.promise = null;
        throw err;
      })
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;


export async function getMongoClient(): Promise<any> {
  await connectToDatabase();
  return mongoose.connection.getClient();
}


export async function dropIndex(cb: (db: any) => Promise<any>): Promise<void> {
  await connectToDatabase();
  const db = mongoose.connection.db;
  try {
    await cb(db)
    console.log("Index email_1 dropped successfully");
  } catch (error) {
    console.error("Error dropping index email_1:", error);
  }
}


  // await dropIndex((db) =>
  //   db.collection("users").dropIndex("email_1")
  // );