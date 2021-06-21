//this is a route
const router = require('express').Router();

const User = require('../model/User')

//empty post route
router.post('/registration', async (req,res) =>{
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