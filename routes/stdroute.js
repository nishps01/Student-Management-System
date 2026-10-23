import express from "express";

import {
    getStudents,
    getStudent,
    createStudent,
    putStudent,
    patchStudentData,
    removeStudent,
    searchStudent
} from "../controllers/stdcontroller.js";


const router = express.Router();


/**
 * @swagger
 * /data:
 *   get:
 *     summary: Get all students
 *     description: Fetch all students from the database
 *     responses:
 *       200:
 *         description: Successfully fetched all students
 */
 router.get("/", getStudents);

/**
 * @swagger
 * /data/search:
 *   get:
 *     summary: Search student by name
 *     description: Search student data by name
 *     responses:
 *       200:
 *         description: Successfully searched student
 */
router.get("/search", searchStudent);


/**
 * @swagger
 * /data/{id}:
 *   get:
 *     summary: Get student by ID
 *     description: Fetch a single student using student ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully fetched student
 *       404:
 *         description: Student not found
 */
router.get("/:id", getStudent);


/**
 * @swagger
 * /data:
 *   post:
 *     summary: Create a new student
 *     description: Add a new student to the database
 *     responses:
 *       201:
 *         description: Student created successfully
 */

 
router.post("/", createStudent);

/**
 * @swagger
 * /data/{id}:
 *   put:
 *     summary: Update student
 *     description: Update complete student data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */


 
router.put("/:id", putStudent);

/**
 * @swagger
 * /data/{id}:
 *   patch:
 *     summary: Partially update student
 *     description: Update specific student fields
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 */
 
router.patch("/:id", patchStudentData);

/**
 * @swagger
 * /data/{id}:
 *   delete:
 *     summary: Delete student
 *     description: Delete a student using student ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete("/:id", removeStudent);


export default router;