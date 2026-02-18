const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailID, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid!");
    }  
    /*else if(firstName.length<4 || firstName.length>20){
        throw new Error("First name should be 4-20 characters");
    }*/
    else if(!validator.isEmail(emailID)){
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!");
    }
};

module.exports = { validateSignUpData };