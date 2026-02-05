const express = require('express');
const app = express();

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
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({firstName: 'Abhijoy', lastName: 'Samaddar'});
});

app.post("/user", (req, res) => {
    //console.log("Save data to the database");
    res.send("Hello from POST User API");
});

app.delete("/user", (req, res) => {
    res.send("Deleted successfully!!");
});

app.use("/test", (req, res) => {
    res.send('Hello from the Server!');
});

//anything that has "a" in the path will be handled by this API
app.get(/a/, (req, res) => {
    res.send({firstName: 'Abhijoy', lastName: 'Samaddar'});
});

//anything that ends with "fly" in the path will be handled by this API
app.get(/.*fly$/, (req, res) => {
    res.send({firstName: 'Abhijoy', lastName: 'Samaddar'});
});

// app.use("/", (req, res) => {
//     res.send('Namaste Abhijoy Samaddar!');
// });

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});

