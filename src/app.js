const express = require('express');
const app = express();

app.use("/", (req, res) => {
    res.send('Namaste Abhijoy Samaddar!');
});

app.use("/test", (req, res) => {
    res.send('Hello from the Server!');
});

app.use("/hello", (req, res) => {
    res.send('Joy East Bengal!');
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});

