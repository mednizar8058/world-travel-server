

const express = require('express');
const app = express();
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://bino:Binoonib123123@cluster0.e2xpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true },
() => console.log("connected to the database !")
);

//import routes
const authRoute = require('./routes/auth')

//Route middlewares
app.use('/api/user', authRoute); // when I navigate to /api/user I wanna use this authRoute


//start the server
app.listen(1234, () => console.log("server is up and running"));
