// Importing the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model application data and includes built-in type casting, validation, query building, and business logic hooks.
const mongoose = require('mongoose');

// Defining a schema for the "User" collection in MongoDB. A schema is a blueprint for the structure of the documents in the collection. It defines the fields and their data types, as well as any validation rules or default values.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        //required: true
    },
    lastName: {
        type: String,
    },
    emailID: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

//creating a model named "User" using the userSchema defined above. The model will be used to interact with the "users" collection in the MongoDB database. It provides an interface for performing CRUD (Create, Read, Update, Delete) operations on the user data stored in the database.
module.exports = mongoose.model("User", userSchema);