import { ObjectId } from "mongodb";
import { getDB } from "../config/database.js";


// =====================================
// USER / AUTH
// =====================================

// users collection
function getUserCollection() {

    const db = getDB();

    return db.collection("users");
}

// Search student by name

async function searchStudentByName(name) {

    const collection = getCollection();

    const data = await collection.find({
        name: {
            $regex: name,
            $options: "i"
        }
    }).toArray();

    return data;
}
// Email se user find karna
async function findUserByEmail(email) {

    const collection = getUserCollection();

    return await collection.findOne({
        email: email
    });
}


// New user create karna
async function createUser(userData) {

    const collection = getUserCollection();

    // Email duplicate nahi hone dena
    await collection.createIndex(
        { email: 1 },
        { unique: true }
    );

    return await collection.insertOne(userData);
}


// =====================================
// STUDENT
// =====================================

// mypercentage collection
function getCollection() {

    const db = getDB();

    return db.collection("mypercentage");
}


// GET
async function getAllStudents() {

    const collection = getCollection();

    return await collection.find({}).toArray();
}
// Single student get karna
async function getStudentById(id) {

    const collection = getCollection();

    if (!ObjectId.isValid(id)) {
        return null;
    }

    return await collection.findOne({
        _id: new ObjectId(id)
    });
}

// POST
async function insertStudents(data) {

    const collection = getCollection();

    if (Array.isArray(data)) {

        return await collection.insertMany(data);

    } else {

        return await collection.insertOne(data);

    }
}


// PUT
async function updateStudent(id, data) {
    const collection = getCollection();

    if (!ObjectId.isValid(id)) return null;

    return await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
}


// PATCH
async function patchStudent(id, data) {
    const collection = getCollection();

    if (!ObjectId.isValid(id)) return null;

    return await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
}

// DELETE
async function deleteStudent(id) {
    const collection = getCollection();

    if (!ObjectId.isValid(id)) {
        return null;
    }

    return await collection.deleteOne({
        _id: new ObjectId(id)
    });
}


// =====================================
// EXPORT
// =====================================

export {
    getAllStudents,
    getStudentById,
    insertStudents,
    updateStudent,
    patchStudent,
    deleteStudent,
    searchStudentByName,
    findUserByEmail,
    createUser
};