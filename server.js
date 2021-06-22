const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//import routes
const authRoute = require('./routes/auth')

const str = process.env.DB_CONNECT
//connect to the database
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log("connected to the database !")
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//middleware
app.use(express.json())

//Route middlewares
app.use('/api/user', authRoute); // when I navigate to /api/user I wanna use this authRoute


//start the server
app.listen(1234, () => console.log("server is up and running"));
