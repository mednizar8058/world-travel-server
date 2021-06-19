const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


const str = process.env.DB_CONNECT
//connect to the database
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log("connected to the database !")
);

//import routes
const authRoute = require('./routes/auth')

//Route middlewares
app.use('/api/user', authRoute); // when I navigate to /api/user I wanna use this authRoute


//start the server
app.listen(1234, () => console.log("server is up and running"));
