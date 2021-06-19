

const express = require('express');
const app = express();

//import routes
const authRoute = require('./routes/auth')

//Route middlewares
app.use('/api/user', authRoute); // when I navigate to /api/user I wanna use this authRoute


//start the server
app.listen(1234, () => console.log("server is up and running"));
