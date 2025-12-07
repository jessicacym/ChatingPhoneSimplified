// MongoDB connection utility for serverless functions
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jessicacym94_db_user:k79WEWGnMey4RtN5@cluster0.4q0ji8h.mongodb.net/chat_app?retryWrites=true&w=majority";
const DB_NAME = process.env.DB_NAME || "chat_app";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        try {
            // Test if connection is still alive
            await cachedDb.command({ ping: 1 });
            return { client: cachedClient, db: cachedDb };
        } catch (e) {
            // Connection lost, reset cache
            cachedClient = null;
            cachedDb = null;
        }
    }

    const client = new MongoClient(MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
    });

    await client.connect();
    const db = client.db(DB_NAME);

    // Verify connection
    await db.command({ ping: 1 });
    console.log("✓ Connected to MongoDB");

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

module.exports = { connectToDatabase };
