// Login check karne wala middleware

function requireLogin(req, res, next) {

    // Check karo session me user hai ya nahi
    if (!req.session.user) {

        // User login nahi hai
        // to login page par bhej do
        return res.redirect("/auth/login.html");
    }

    // User login hai
    // to next route/controller ko chalne do
    next();
}


// Login/Register page ko check karne wala middleware

function redirectIfLoggedIn(req, res, next) {

    // Agar user already login hai
    if (req.session.user) {

        // to dobara login/register nahi karne dena
        return res.redirect("/home.html");
    }

    // Login nahi hai
    // to requested page kholne do
    next();
}


export {
    requireLogin,
    redirectIfLoggedIn
};