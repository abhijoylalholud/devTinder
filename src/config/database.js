const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect( 
        "mongodb+srv://abhijoysamaddar:abhijoysamaddar@namastenode.e4mqn8b.mongodb.net/devTinder"
    );
};

module.exports = connectDB;