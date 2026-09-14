import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bhasko';

interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseGlobal | undefined;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (global.mongoose!.conn) return global.mongoose!.conn;

  if (!global.mongoose!.promise) {
    global.mongoose!.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || 'bhasko',
      bufferCommands: false,
    });
  }

  try {
    global.mongoose!.conn = await global.mongoose!.promise;
  } catch (e) {
    global.mongoose!.promise = null;
    throw e;
  }
  return global.mongoose!.conn;
}

export default connectDB;
