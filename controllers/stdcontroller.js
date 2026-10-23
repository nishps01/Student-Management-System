import {
    getAllStudents,
    getStudentById,
    insertStudents,
    updateStudent,
    patchStudent,
    deleteStudent,
    searchStudentByName
} from "../models/stdmodel.js";


// GET
async function getStudents(req, res) {

    const data = await getAllStudents();

  

    res.json(data);
}

// Single student GET
async function getStudent(req, res) {

    const id = req.params.id;

    const student = await getStudentById(id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
}

// POST


async function createStudent(req, res) {

const data = req.body;

const marks = [
    data.highschool,
    data.intermediate,
    data.bca,
    data.mca
];

const invalid = marks.some(value => !/^\d{1,3}$/.test(value));

if (invalid) {
    return res.status(400).json({
        message: "Maximum 3 digits are allowed"
    });
}

await insertStudents(data);

res.redirect("/success.html");
}



// PUT


async function putStudent(req, res) {
    const id = req.params.id;
    const updatedata = req.body;

    const result = await updateStudent(id, updatedata);

    if (!result) {
        return res.status(400).json({
            message: "Invalid MongoDB ID"
        });
    }

    if (result.matchedCount === 0) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json({
        message: "Student updated successfully"
    });
}


// PATCH
async function patchStudentData(req, res) {
    const id = req.params.id;
    const updatedata = req.body;

    const result = await patchStudent(id, updatedata);

    if (!result) {
        return res.status(400).json({
            message: "Invalid MongoDB ID"
        });
    }

    if (result.matchedCount === 0) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json({
        message: "Student updated successfully"
    });
}

// DELETE
async function removeStudent(req, res) {

    const id = req.params.id;

    const result = await deleteStudent(id);


if (!result) {
    return res.status(400).json({
        message: "Invalid MongoDB ID"
    });
}
 
    if (result.deletedCount === 0) {

        return res.status(404).json({
            message: "Data not found"
        });

    }


    res.json({
        message: "Data deleted successfully"
    });
}

// Search student

async function searchStudent(req, res) {

    const name = req.query.name;

    if (!name) {
        return res.json([]);
    }

    const data = await searchStudentByName(name);

    res.json(data);
}

export {
    getStudents,
    getStudent,
    createStudent,
    putStudent,
    patchStudentData,
    removeStudent,
    searchStudent
};