import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://localhost:27017");

export const getMongoCollection = (collectionName: string) =>
    client.db("hive").collection(collectionName);
