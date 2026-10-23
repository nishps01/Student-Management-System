 
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
    registerUser,
    loginUser,
    showRegisterPage,
    showLoginPage,
    showProfilePage,
    getProfile,
    updateProfile,
    logoutUser,
    getCurrentUser
} from "../controllers/authController.js";

import {
    redirectIfLoggedIn,
    requireLogin
} from "../middleware/authMiddleware.js";


const router = express.Router();


// =====================================
// UPLOAD FOLDER
// =====================================

// Profile photos public/uploads folder mein save hongi
const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads"
);

// Folder exist nahi karta to create karo
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


// =====================================
// MULTER STORAGE CONFIGURATION
// =====================================

const storage = multer.diskStorage({

    // File save karne ki location
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },

    // Unique filename generate karo
    filename: (req, file, callback) => {

        const extension = path
            .extname(file.originalname)
            .toLowerCase();

        const filename = `${Date.now()}${extension}`;

        callback(null, filename);
    }
});


// =====================================
// MULTER IMAGE FILTER
// =====================================

function imageFilter(req, file, callback) {

    if (file.mimetype.startsWith("image/")) {
        callback(null, true);
    } else {
        callback(new Error("Only image files are allowed"));
    }
}


// =====================================
// MULTER CONFIGURATION
// =====================================

const upload = multer({

    storage: storage,

    // Maximum file size: 2 MB
    limits: {
        fileSize: 2 * 1024 * 1024
    },

    // Sirf image files accept hongi
    fileFilter: imageFilter

});


// =====================================
// REGISTER PAGE
// =====================================

router.get(
    "/register.html",
    redirectIfLoggedIn,
    showRegisterPage
);


// =====================================
// REGISTER USER
// =====================================

router.post(
    "/register",
    redirectIfLoggedIn,
    registerUser
);


// =====================================
// LOGIN PAGE
// =====================================

router.get(
    "/login.html",
    redirectIfLoggedIn,
    showLoginPage
);


// =====================================
// LOGIN USER
// =====================================

router.post(
    "/login",
    redirectIfLoggedIn,
    loginUser
);


// =====================================
// PROFILE PAGE
// =====================================

router.get(
    "/profile.html",
    requireLogin,
    showProfilePage
);


// =====================================
// GET PROFILE DATA
// =====================================

router.get(
    "/profile",
    requireLogin,
    getProfile
);


// =====================================
// UPDATE PROFILE + PHOTO UPLOAD
// =====================================

router.post(
    "/profile",
    requireLogin,
    upload.single("photo"),
    updateProfile
);


// =====================================
// CURRENT LOGGED-IN USER
// =====================================

router.get(
    "/me",
    requireLogin,
    getCurrentUser
);


// =====================================
// LOGOUT USER
// =====================================

router.get(
    "/logout",
    requireLogin,
    logoutUser
);


// =====================================
// EXPORT ROUTER
// =====================================

export default router;
