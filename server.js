
import express from "express";
import "dotenv/config";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

import swaggerOptions from "./swag.js";
import { connectDB } from "./config/database.js";
import studentRoutes from "./routes/stdroute.js";
import authRoutes from "./routes/authRoutes.js";

import { requireLogin } from "./middleware/authMiddleware.js";


const app = express();

const PORT = process.env.PORT || 3000;

const pagesPath = path.join(process.cwd(), "pages");
const publicPath = path.join(process.cwd(), "public");


// ==================================================
// 1. SWAGGER API DOCUMENTATION
// ==================================================

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


// ==================================================
// 2. BASIC MIDDLEWARE
// ==================================================

// JSON data read karne ke liye
app.use(express.json());


// HTML form data read karne ke liye
app.use(
    express.urlencoded({
        extended: true
    })
);


// CSS, JavaScript aur images serve karne ke liye
app.use(express.static(publicPath));


// ==================================================
// 3. SESSION CONFIGURATION
// ==================================================

if (
    process.env.NODE_ENV === "production" &&
    !process.env.SESSION_SECRET
) {
    throw new Error(
        "Production mein SESSION_SECRET set karna zaroori hai"
    );
}

app.use(
    session({
        name: "student.sid",

        secret:
            process.env.SESSION_SECRET ||
            "student-secret-dev-only",

        resave: false,

        saveUninitialized: false,

        cookie: {
            httpOnly: true,

            // Local development ke liye false.
            // HTTPS production mein true rakho.
            secure: process.env.NODE_ENV === "production",

            sameSite: "lax",

            // Session cookie 1 hour tak valid rahegi
            maxAge: 1000 * 60 * 60
        }
    })
);


// ==================================================
// 4. AUTHENTICATION ROUTES
// ==================================================

app.use("/auth", authRoutes);


// ==================================================
// 5. ROOT ROUTE
// ==================================================

app.get("/", (req, res) => {

    if (req.session?.user) {
        return res.redirect("/home.html");
    }

    res.redirect("/auth/register.html");
});


// ==================================================
// 6. PROTECTED HTML PAGES
// ==================================================

// HOME PAGE
app.get("/home.html", requireLogin, (req, res) => {
    res.sendFile(path.join(pagesPath, "home.html"));
});


// ADD STUDENT PAGE
app.get("/post.html", requireLogin, (req, res) => {
    res.sendFile(path.join(pagesPath, "post.html"));
});


// ALL STUDENTS PAGE
app.get("/allstudents.html", requireLogin, (req, res) => {
    res.sendFile(path.join(pagesPath, "allstudents.html"));
});


// MANAGE STUDENT PAGE
app.get("/manage.html", requireLogin, (req, res) => {
    res.sendFile(path.join(pagesPath, "manage.html"));
});


// SUCCESS PAGE
app.get("/success.html", requireLogin, (req, res) => {
    res.sendFile(path.join(pagesPath, "success.html"));
});


// STUDENT DETAIL PAGE
app.get("/studentdetail.html", requireLogin, (req, res) => {
    res.sendFile(path.join(pagesPath, "studentdetail.html"));
});


// ==================================================
// 7. STUDENT CRUD ROUTES
// ==================================================

// Saari student APIs login ke baad hi access hongi.
app.use(
    "/data",
    requireLogin,
    studentRoutes
);


// ==================================================
// 8. 404 HANDLER
// ==================================================

app.use((req, res) => {
    res.status(404).send("404 - Page not found");
});


// ==================================================
// 9. ERROR HANDLER
// ==================================================

app.use((err, req, res, next) => {

    console.error(err.message);

    if (err instanceof Error &&
        err.message === "Only image files are allowed") {
        return res.status(400).send(err.message);
    }

    if (err instanceof Error &&
        err.name === "MulterError") {
        return res.status(400).send(
            "File upload failed. Image size must be within 2 MB."
        );
    }

    res.status(500).send("Internal server error");
});


// ==================================================
// 10. START SERVER
// ==================================================

async function startServer() {

    try {

        // Pehle MongoDB connect hoga
        await connectDB();

        // MongoDB connect hone ke baad server start hoga
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
            console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
        });

    } catch (error) {

        console.error("Server startup failed:", error.message);
        process.exitCode = 1;

    }
}

startServer();
