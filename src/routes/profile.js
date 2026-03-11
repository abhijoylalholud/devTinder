const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        /*const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid token!");
        }*/
        //Validate token
        /*const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
        const { _id } = decodedMessage;*/
        //console.log("Logged In user is: " + _id);

        /*const user = await User.findById(_id);
        if(!user){
            throw new Error("User does not exist!");
        }*/
        const user = req.user;
        res.send(user);
    } 
    catch(err) {
        res.status(400).send("Error: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request!");
            //return res.status(400).send("");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        //res.send(`${loggedInUser.firstName}, your profile updated successfully!`);
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully!`,
            data: loggedInUser
        });
    } catch(err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = profileRouter;