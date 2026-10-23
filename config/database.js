 

import { MongoClient } from "mongodb";

// =====================================
// MONGODB CONFIGURATION
// =====================================

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;


// =====================================
// VALIDATE ENVIRONMENT VARIABLES
// =====================================

if (!url) {
    throw new Error("MONGO_URL .env file mein missing hai");
}

if (!dbName) {
    throw new Error("DB_NAME .env file mein missing hai");
}


// =====================================
// MONGODB CLIENT
// =====================================

const client = new MongoClient(url);

let db;


// =====================================
// CONNECT DATABASE
// =====================================

async function connectDB() {
    try {
        await client.connect();

        // Connection verify karo
        await client.db("admin").command({ ping: 1 });

        db = client.db(dbName);

        console.log(`MongoDB connected: ${dbName}`);

        return db;

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}


// =====================================
// GET DATABASE
// =====================================

function getDB() {
    if (!db) {
        throw new Error(
            "Database connected nahi hai. Pehle connectDB() call karo."
        );
    }

    return db;
}


// =====================================
// EXPORT
// =====================================

export { connectDB, getDB };
