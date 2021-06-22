//this is a route
const router = require('express').Router();
const { required } = require('@hapi/joi');
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const user = require('../model/User');

//user validation






//registration
router.post('/registration', async (req,res) =>{
    //validating the data before creating a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user exist
    const userExist = await User.findOne({email : req.body.email});
    if(userExist) return res.status(400).send('email already exist');

    //now we need to hash the password --never store the password as plain text :( --
    //A salt is a random string. By hashing a plain text password plus a salt, 
    // the hash algorithm’s output is no longer predictable. The same password will no longer yield the same hash.
    // The salt gets automatically included with the hash, so you do not need to store it in a database.
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // create a user after validation
    const user = new User({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser); // to see our newly saved user
    }catch(err){
        res.status(200).send(err);
    }
});

//login
router.post('/login', async (req,res) =>{
    //validating data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user exists
    const userExist = await User.findOne({email : req.body.email});
    if(!userExist) return res.status(400).send("check ur email or password");

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, userExist.password);
    if(!validPassword) return res.status(400).send('invalid password');

    res.send('login in succesful');

    

});

module.exports = router;