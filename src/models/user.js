// Importing the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data and includes built-in type casting, validation, query building, and business logic hooks.
const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Defining a schema for the "User" collection in MongoDB. A schema is a blueprint for the structure of the documents in the collection. It defines the fields and their data types, as well as any validation rules or default values.
const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 20
        },
        lastName: {
            type: String,
        },
        emailID: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email Address: " + value);
                }
            }
        },
        password: {
            type: String,
            required: true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Enter a strong password: " + value);
                }
            }
        },
        age: {
            type: Number,
            min: 18
        },
        gender: {
            type: String,
            validate(value) {
                if(!["male", "female", "others"].includes(value)){
                    throw new Error("Gender data is not valid!");
                }
            }
        },
        photoUrl: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/thumbnails/045/944/199/small_2x/male-default-placeholder-avatar-profile-gray-picture-isolated-on-background-man-silhouette-picture-for-user-profile-in-social-media-forum-chat-greyscale-illustration-vector.jpg",
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("Invalid Photo URL: " + value);
                }
            }
        },
        about: {
            type: String,
            default: "This is a default about of the user!"
        },
        skills: {
            type: [String]
        },
    },
    {
        timestamps: true
    }
);

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", { expiresIn: "7d" });
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

//creating a model named "User" using the userSchema defined above. The model will be used to interact with the "users" collection in the MongoDB database. It provides an interface for performing CRUD (Create, Read, Update, Delete) operations on the user data stored in the database.
module.exports = mongoose.model("User", userSchema);