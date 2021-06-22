const mongoose = require('mongoose');

//create schema to represents the model of a user
const userSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true,
        min : 4
    },
    lname : {
        type : String,
        required : true,
        min : 4
    },
    email : {
        type : String,
        required : true,
        min : 7,
        max : 255
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 1024 // cuz we gonna hash it :)
    }
})

//export our model
module.exports = mongoose.model("User",userSchema);