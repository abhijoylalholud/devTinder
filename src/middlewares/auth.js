//This file contains the authentication middleware functions for admin and user authentication. The adminAuth function checks if the provided token matches a predefined value ("xyz") to determine if the admin is authorized. If the token is valid, it calls the next() function to proceed to the next middleware or route handler; otherwise, it sends a 401 Unauthorized response. The userAuth function performs a similar check for user authentication, but it uses a different token value ("xyzfdsf"). Both functions log messages to indicate when they are being checked.
const adminAuth = (req, res, next) => {
    console.log("Admin Auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send('Unauthorized request!!');
    } else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("User Auth is getting checked!!");
    const token = "xyzfdsf";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send('Unauthorized request!!');
    } else {
        next();
    }
};

// Exporting the adminAuth and userAuth functions as part of an object. This allows other files in the application to import and use these authentication middleware functions to protect routes that require admin or user authentication.
module.exports = {
    adminAuth,
    userAuth
};