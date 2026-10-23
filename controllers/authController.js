// import bcrypt from "bcryptjs";
// import path from "path";

// import {
//     findUserByEmail,
//     createUser,
//     findUserById,
//     updateUserProfile
// } from "../models/userModel.js";


// // pages folder ka path
// const pagesPath = path.join(process.cwd(), "pages");


// // =====================================
// // REGISTER PAGE
// // =====================================

// function showRegisterPage(req, res) {

//     res.sendFile(
//         path.join(
//             pagesPath,
//             "register.html"
//         )
//     );
// }


// // =====================================
// // LOGIN PAGE
// // =====================================

// function showLoginPage(req, res) {

//     res.sendFile(
//         path.join(
//             pagesPath,
//             "login.html"
//         )
//     );
// }


// // =====================================
// // REGISTER USER
// // =====================================

// async function registerUser(req, res) {

//     const { name, email, password } = req.body;


//     // Email / password / name check
//     if (!name || !email || !password) {

//         return res.status(400).send(`
//             <h2>Name, email and password are required</h2>

//             <a href="/auth/register.html">
//                 Go Back
//             </a>
//         `);
//     }


//     // Password length
//     if (password.length < 6) {

//         return res.status(400).send(`
//             <h2>Password must be at least 6 characters</h2>

//             <a href="/auth/register.html">
//                 Go Back
//             </a>
//         `);
//     }


//     // Email lowercase
//     const userEmail = email.toLowerCase();


//     // Check already registered
//     const existingUser =
//         await findUserByEmail(userEmail);


//     if (existingUser) {

//         return res.status(409).send(`
//             <h2>User already registered</h2>

//             <a href="/auth/login.html">
//                 Go to Login
//             </a>
//         `);
//     }


//     // Password hash
//     const hashedPassword =
//         await bcrypt.hash(password, 10);


//     // Save user in MongoDB
//     await createUser({

//         name: name,

//         email: userEmail,

//         password: hashedPassword,

//         createdAt: new Date()

//     });


//     // Registration ke baad login
//     res.redirect("/auth/login.html");
// }


// // =====================================
// // LOGIN USER
// // =====================================

// async function loginUser(req, res) {

//     const { email, password } = req.body;


//     // Input check
//     if (!email || !password) {

//         return res.status(400).send(`
//             <h2>Email and password are required</h2>

//             <a href="/auth/login.html">
//                 Go Back
//             </a>
//         `);
//     }


//     const userEmail = email.toLowerCase();


//     // User find
//     const user =
//         await findUserByEmail(userEmail);


//     // User registered nahi hai
//     if (!user) {

//         return res.status(401).send(`
//             <h2>User is not registered</h2>

//             <a href="/auth/register.html">
//                 Register First
//             </a>
//         `);
//     }


//     // Password check
//     const passwordMatch =
//         await bcrypt.compare(
//             password,
//             user.password
//         );


//     // Wrong password
//     if (!passwordMatch) {

//         return res.status(401).send(`
//             <h2>Invalid email or password</h2>

//             <a href="/auth/login.html">
//                 Try Again
//             </a>
//         `);
//     }


//     // Session create
//  req.session.user = {

//     id: user._id.toString(),

//     name: user.name,

//     email: user.email

// };

//     // Login success
//     res.redirect("/home.html");
// }

// // =====================================
// // CURRENT LOGGED-IN USER
// // =====================================

// function getCurrentUser(req, res) {

//     res.json({
//         name: req.session.user.name,
//         email: req.session.user.email
//     });

// }
// // =====================================
// // PROFILE PAGE
// // =====================================

// function showProfilePage(req, res) {

//     res.sendFile(
//         path.join(
//             pagesPath,
//             "profile.html"
//         )
//     );
// }


// // =====================================
// // GET PROFILE DATA
// // =====================================

// async function getProfile(req, res) {

//     // Session se logged-in user ki id
//     const userId = req.session.user.id;


//     // MongoDB se user find
//     const user =
//         await findUserById(userId);


//     if (!user) {

//         return res.status(404).json({
//             message: "User not found"
//         });
//     }


//     // Frontend ko user data
//     res.json({

//         name: user.name,

//         email: user.email,

// photo: user.photo || "/uploads/default-profile.jpg"
//     });
// }


// // =====================================
// // UPDATE PROFILE
// // =====================================

// async function updateProfile(req, res) {

//     // Logged-in user ki ID
//     const userId =
//         req.session.user.id;


//     // Name update
//     const data = {

//         name: req.body.name

//     };


//     // Agar photo upload hui hai
//     if (req.file) {

//         data.photo =
//             "/uploads/" + req.file.filename;
//     }


//     // MongoDB update
//     await updateUserProfile(
//         userId,
//         data
//     );


//     // Profile page par wapas
//     res.redirect("/auth/profile.html");
// }


// // =====================================
// // LOGOUT
// // =====================================

// function logoutUser(req, res) {

//     req.session.destroy(() => {

//         res.redirect("/auth/login.html");

//     });
// }


// // =====================================
// // EXPORT
// // =====================================
// export {
//     showRegisterPage,
//     showLoginPage,
//     registerUser,
//     loginUser,
//     showProfilePage,
//     getProfile,
//     updateProfile,
//     logoutUser,
//     getCurrentUser
// };





// 
import bcrypt from "bcryptjs";
import path from "path";

import {
    findUserByEmail,
    createUser,
    findUserById,
    updateUserProfile
} from "../models/userModel.js";

const pagesPath = path.join(process.cwd(), "pages");

// REGISTER PAGE
function showRegisterPage(req, res) {
    res.sendFile(path.join(pagesPath, "register.html"));
}

// LOGIN PAGE
function showLoginPage(req, res) {
    res.sendFile(path.join(pagesPath, "login.html"));
}

// REGISTER USER
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).send(
                "Name, email and password are required."
            );
        }

        if (password.length < 6) {
            return res.status(400).send(
                "Password must be at least 6 characters."
            );
        }

        const userEmail = email.trim().toLowerCase();

        const existingUser = await findUserByEmail(userEmail);

        if (existingUser) {
            return res.status(409).send(
                'User already registered. <a href="/auth/login.html">Login</a>'
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser({
            name: name.trim(),
            email: userEmail,
            password: hashedPassword,
            createdAt: new Date()
        });

        return res.redirect("/auth/login.html");
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send("Email is already registered.");
        }

        console.error("Registration error:", error);
        return res.status(500).send("Registration failed. Please try again.");
    }
}

// LOGIN USER
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).send(
                "Email and password are required."
            );
        }

        const userEmail = email.trim().toLowerCase();
        const user = await findUserByEmail(userEmail);

        if (!user) {
            return res.status(401).send(
                'Invalid email or password. <a href="/auth/register.html">Register</a>'
            );
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).send(
                'Invalid email or password. <a href="/auth/login.html">Try again</a>'
            );
        }

        // Regenerate session after successful login
        req.session.regenerate((error) => {
            if (error) {
                console.error("Session error:", error);
                return res.status(500).send("Login failed. Please try again.");
            }

            req.session.user = {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            };

            req.session.save((saveError) => {
                if (saveError) {
                    console.error("Session save error:", saveError);
                    return res.status(500).send("Login failed. Please try again.");
                }

                return res.redirect("/home.html");
            });
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send("Login failed. Please try again.");
    }
}

// CURRENT LOGGED-IN USER
function getCurrentUser(req, res) {
    if (!req.session?.user) {
        return res.status(401).json({
            message: "Please log in first."
        });
    }

    return res.json({
        name: req.session.user.name,
        email: req.session.user.email
    });
}

// PROFILE PAGE
function showProfilePage(req, res) {
    if (!req.session?.user) {
        return res.redirect("/auth/login.html");
    }

    return res.sendFile(path.join(pagesPath, "profile.html"));
}

// GET PROFILE DATA
async function getProfile(req, res) {
    try {
        if (!req.session?.user?.id) {
            return res.status(401).json({
                message: "Please log in first."
            });
        }

        const user = await findUserById(req.session.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.json({
            name: user.name,
            email: user.email,
            photo: user.photo || "/uploads/default-profile.jpg"
        });
    } catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({
            message: "Could not load profile."
        });
    }
}

// UPDATE PROFILE
async function updateProfile(req, res) {
    try {
        if (!req.session?.user?.id) {
            return res.status(401).send("Please log in first.");
        }

        const name = req.body.name;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).send("Name is required.");
        }

        const data = {
            name: name.trim()
        };

        if (req.file) {
            data.photo = "/uploads/" + req.file.filename;
        }

        const result = await updateUserProfile(
            req.session.user.id,
            data
        );

        if (!result || result.matchedCount === 0) {
            return res.status(404).send("User not found.");
        }

        req.session.user.name = data.name;

        return res.redirect("/auth/profile.html");
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).send("Could not update profile.");
    }
}

// LOGOUT
function logoutUser(req, res, next) {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }

        res.clearCookie("connect.sid");
        return res.redirect("/auth/login.html");
    });
}

// EXPORT
export {
    showRegisterPage,
    showLoginPage,
    registerUser,
    loginUser,
    showProfilePage,
    getProfile,
    updateProfile,
    logoutUser,
    getCurrentUser
};
