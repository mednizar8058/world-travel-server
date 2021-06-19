//this is a route

const router = require('express').Router();

//empty post route
router.post('/registration',(req,res) =>{
    res.send('register complete')
});

module.exports = router;