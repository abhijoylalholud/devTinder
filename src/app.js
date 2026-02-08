const express = require('express');
const app = express();

const { adminAuth, userAuth } = require('./middlewares/auth');

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

app.delete("/user", (req, res) => {
    res.send("Deleted successfully!!");
});*/

/*app.use("/test", (req, res) => {
    res.send('Hello from the Server!');
});*/

app.use(
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
]);

//GET /users => It checks all the app.xxx("matching route") functions
//GET /users => middleware chain => request handler

app.use("/lalholud", (req, res, next) => {
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
});


app.get("/getUserData", (req, res) => {
    //try {
        throw new Error("SDSDFSDF!!");
        res.send('User data sent!!');
    //} catch (err) {
        //res.status(500).send('Some error please contact support team!!');
    //}
});

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send('Something went wrong!!');
    }
});

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

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});

