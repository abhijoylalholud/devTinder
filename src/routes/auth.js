const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require('../models/user');
const bcrypt = require("bcrypt");

//Signup API
authRouter.post("/signup", async (req, res) => {
    /*const userObj = {
        firstName: "Sourav",
        lastName: "Ganguly",
        emailID: "sourav.ganguly@gmail.com",
        password: "sourav123",
    }*/
    try{
        validateSignUpData(req);
        //console.log(req.body);
        const {firstName, lastName, emailID, password, gender} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        //console.log(passwordHash);
        
        //creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailID,
            password: passwordHash,
            gender,
        });

        //saving the user object to the database using the save() method provided by Mongoose. This method is asynchronous and returns a promise, which is why we use the await keyword to wait for the operation to complete before proceeding. If the save operation is successful, it will persist the user data in the MongoDB database. If there is an error during the save process, it will throw an error that can be caught and handled in the catch block.
        await user.save();
        res.send("User added successfully!!");
    } catch(err) {
        //If there is an error during the save process, it will catch the error and send a response with a status code of 400 (Bad Request) along with an error message that includes the details of the error. This allows the client to understand that there was an issue with adding the user and provides information about what went wrong.
        res.status(400).send("Error adding user: " + err.message);
    }
});

//Login API
authRouter.post("/login", async (req, res) => {
    try{
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailID: emailId });
        if(!user){
            throw new Error("Email ID is not present in DB");
            //always use below message in real time, I am using above message just for practice
            //throw new Error("Invalid credentials"); //or use below
            //throw new Error("Email id or password is incorrect");
        }

        //const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            //Create a JWT(JSON Web Token)
            //const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "7d" });
            const token = await user.getJWT();

            //Add the token to cookie and send the response back to the server
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000), }); //for 8 hours
            res.send("Login successful!");
        } else {
            throw new Error("Password is not correct!");
            //throw new Error("Invalid credentials");
        }
    } 
    catch(err) {
        res.status(400).send("Error: " + err.message);
    }
});

//Logout API
authRouter.post("/logout", async (req, res) => {
    res.cookie("token", "null", {
        expires: new Date(Date.now()),
    }).send("Logout successful!!");
});   

module.exports = authRouter;