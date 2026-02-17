const mongoose = require('mongoose');

// This function is an asynchronous function that connects to a MongoDB database using the Mongoose library. It uses the mongoose.connect() method to establish a connection to the database specified by the connection string provided as an argument. The connection string includes the username, password, and database name required to access the MongoDB instance. If the connection is successful, the function will complete without any issues. If there is an error during the connection process, it will throw an error that can be caught and handled by the caller of this function.
//Async await is used to handle asynchronous operations in JavaScript. It allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain. In this case, the function connectDB is defined as an asynchronous function using the async keyword, and it uses the await keyword to wait for the mongoose.connect() method to complete before proceeding. This ensures that the database connection is established before any further code is executed that relies on the database connection.
const connectDB = async () => {
    await mongoose.connect( 
        "mongodb+srv://abhijoysamaddar:abhijoysamaddar@namastenode.e4mqn8b.mongodb.net/devTinder"
    );
};

module.exports = connectDB;