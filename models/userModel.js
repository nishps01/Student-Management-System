
import { getDB } from "../config/database.js";
import { ObjectId } from "mongodb";

// USERS COLLECTION
function getUserCollection() {
    const db = getDB();
    return db.collection("admin-users");
}

// FIND USER BY EMAIL
async function findUserByEmail(email) {
    const collection = getUserCollection();

    return collection.findOne({
        email: email.toLowerCase()
    });
}

// CREATE USER
async function createUser(userData) {
    const collection = getUserCollection();

    await collection.createIndex(
        { email: 1 },
        { unique: true }
    );

    return collection.insertOne(userData);
}

// FIND USER BY ID
async function findUserById(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const collection = getUserCollection();

    return collection.findOne({
        _id: new ObjectId(id)
    });
}

// UPDATE USER PROFILE
async function updateUserProfile(id, data) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const collection = getUserCollection();

    return collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
}

// EXPORT
export {
    findUserByEmail,
    createUser,
    findUserById,
    updateUserProfile
}