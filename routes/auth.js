//this is a route
const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validation');

//user validation






//empty post route
router.post('/registration', async (req,res) =>{
    //validating the data before creating a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if user exist
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('email already exist');



    // create a user after validation
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