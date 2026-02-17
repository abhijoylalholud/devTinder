const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

// This line is used to parse incoming JSON payloads in the request body. It allows the server to understand and handle JSON data sent by clients in POST, PUT, or PATCH requests. By using express.json(), the server can access the parsed JSON data through req.body in route handlers, making it easier to work with JSON data in the application.
app.use(express.json()); 

app.post("/signup", async (req, res) => {
    /*console.log(req.body);
    const userObj = {
        firstName: "Sourav",
        lastName: "Ganguly",
        emailID: "sourav.ganguly@gmail.com",
        password: "sourav123",
    }*/
    //creating a new instance of the User model
    const user = new User(req.body);

    try{
        //saving the user object to the database using the save() method provided by Mongoose. This method is asynchronous and returns a promise, which is why we use the await keyword to wait for the operation to complete before proceeding. If the save operation is successful, it will persist the user data in the MongoDB database. If there is an error during the save process, it will throw an error that can be caught and handled in the catch block.
        await user.save();
        res.send("User added successfully!!");
    } catch(err) {
        //If there is an error during the save process, it will catch the error and send a response with a status code of 400 (Bad Request) along with an error message that includes the details of the error. This allows the client to understand that there was an issue with adding the user and provides information about what went wrong.
        res.status(400).send("Error adding user: " + err.message);
    }
});

//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailID;
    try{
        const user = await User.findOne({ emailID: userEmail });
        //const user = await User.findOne(); //return the first user , we can provide request as blank {}
        if(!user){
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch(err) {
        res.status(400).send("Something went wrong", err.message);
    }
    
    /*try{
        const users = await User.find({;
            emailID: userEmail
        });
        if(users.length === 0){
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch(err) {
        res.status(400).send("Something went wrong");
    }*/
});

//Feed API - GET /feed - get all users from the database
app.get('/feed', async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
});

//Delete a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        //const user = await User.findByIdAndDelete({ _id: userId});
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully!!");
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
});

//Update data of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const user = await User.findByIdAndUpdate({ _id: userId}, data, { returnDocument: "after" });
        console.log(user);
        res.send("User updated successfully!!");
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
});

//This code block is responsible for establishing a connection to the MongoDB database using the connectDB function. It uses the .then() method to handle the successful connection case, where it logs a message indicating that the database connection has been established and starts the Express server on port 7777. If there is an error during the connection process, it catches the error and logs an error message along with the error details. This ensures that the application can handle both successful and unsuccessful attempts to connect to the database gracefully.
connectDB().then(() => {
    console.log("Database connection established... ");
    // Starting the Express server and listening on port 7777. When the server is successfully started, it logs a message indicating that the server is running and specifies the port number. This allows the application to accept incoming requests from clients on the specified port.
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch((error) => {
    console.log("Error connecting to MongoDB!!", error);
});

//const { adminAuth, userAuth } = require('./middlewares/auth');

/*app.use("/hello/2", (req, res) => {
    res.send('Abracadabra!');
});

//this will match all the HTTP methods (GET, POST, PUT, DELETE, PATCH etc.) API calls to the path "/hello" and send the response "Joy East Bengal!" back to the client. So, whenever a client makes a request to "/hello", regardless of the HTTP method used, they will receive the response "Joy East Bengal!" from the server.
app.use("/hello", (req, res) => {
    res.send('Joy East Bengal!');
});*/

//This will only handle GET call to /user
// app.get("/user", (req, res) => {
//     console.log(req.query);
//     res.send({firstName: 'Abhijoy', lastName: 'Samaddar'});
// });

//This will only handle GET call to /user/:userId/::name/:password, where :userId, :name and :password are path parameters. So, whenever a client makes a GET request to a URL that matches the pattern "/user/:userId/:name/:password", the server will extract the values of userId, name, and password from the URL and send a response containing the firstName and lastName as "Abhijoy" and "Samaddar" respectively.
/*app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({firstName: 'Abhijoy', lastName: 'Samaddar'});
});

app.post("/user", (req, res) => {
    res.send("Hello from POST User API");
});

//This will only handle DELETE call to /user, and it will send a response "Deleted successfully!!" back to the client. So, whenever a client makes a DELETE request to "/user", they will receive the response "Deleted successfully!!" from the server.
app.delete("/user", (req, res) => {
    res.send("Deleted successfully!!");
});*/

/*app.use("/test", (req, res) => {
    res.send('Hello from the Server!');
});*/

/*app.use(
    "/abhijoy", [
    (req, res, next) => {
        //Route handler for the path "/abhijoy"
        console.log("Handling the route user!!");
        next(); // Call next() to proceed to the next middleware or route handler
        //res.send('Hello Abhijoy!');
    },
    (req, res, next) => {
        //This is the next middleware function that will be executed after the route handler for "/abhijoy"
        console.log("Handling the route handler 2!!");
        //res.send('2nd response!!');
        next();
    },
    (req, res, next) => {
        //This is the next middleware function that will be executed after the route handler for "/abhijoy"
        console.log("Handling the route handler 3!!");
        //res.send('3rd response!!');
        next();
    },
    (req, res, next) => {
        //This is the next middleware function that will be executed after the route handler for "/abhijoy"
        console.log("Handling the route handler 4!!");
        //res.send('4th response!!');
        next();
    },
    (req, res, next) => {
        //This is the next middleware function that will be executed after the route handler for "/abhijoy"
        console.log("Handling the route handler 5!!");
        res.send('5th response!!');
        //next();
    }
]);*/

//GET /users => It checks all the app.xxx("matching route") functions
//GET /users => middleware chain => request handler

/*app.use("/lalholud", (req, res, next) => {
    console.log("Handling the route lalholud!!");
    res.send('1st route handler!');
    //next();
});

app.use("/lalholud", (req, res, next) => {
    console.log("Handling the route lalholud 2!!");
    res.send('2nd route handler!');
    //next();
});

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send('All data sent!!');
});

app.get("/admin/deleteData", (req, res) => {
    res.send('Data deleted!!');
});

app.post("/user/login", (req, res) => {
    res.send('User logged in successfully!!');
});

app.get("/user/data", userAuth, (req, res) => {
    res.send('User data sent!!');
});*/


/*app.get("/getUserData", (req, res) => {
    //try {
        throw new Error("SDSDFSDF!!");
        res.send('User data sent!!');
    //} catch (err) {
        //res.status(500).send('Some error please contact support team!!');
    //}
});*/

/*app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send('Something went wrong!!');
    }
});*/

//anything that has "a" in the path will be handled by this API
/*app.get(/a/, (req, res) => {
    res.send({firstName: 'Abhijoy', lastName: 'Samaddar'});
});*/

//anything that ends with "fly" in the path will be handled by this API
/*app.get(/.*fly$/, (req, res) => {
    res.send({firstName: 'Abhijoy', lastName: 'Samaddar'});
});*/

// app.use("/", (req, res) => {
//     res.send('Namaste Abhijoy Samaddar!');
// });