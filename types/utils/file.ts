import { MongoClient } from "mongodb";
import mongoose, { Schema, model, Model } from "mongoose";

//export const testModel = new TestSchema("Test", t); //  model("Test", t);

const connectToMongo = async () => mongoose.connect("mongodb://localhost:27017/");
export const mongoClient = new MongoClient("mongodb://localhost:27017/");
export const dbName = "admin";

export default connectToMongo;
