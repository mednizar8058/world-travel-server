//this is a route
const router = require('express').Router();

const User = require('../model/User')

//user validation
const Joi = require('@hapi/joi');
const schema = Joi.object({
    fname : Joi.string().min(6).required(),
    lname : Joi.string().min(6).required(),
    email : Joi.string().min(7).email().required(),
    password : Joi.string().min(6).required()
});





//empty post route
router.post('/registration', async (req,res) =>{
    //validating the data before creating a user
    
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    

    const user = new User({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        password : req.body.password
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser); // to see our newly saved user
    }catch(err){
        res.status(200).send(err);
    }
});

module.exports = router;