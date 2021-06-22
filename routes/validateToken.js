//use this to make a route private

const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied!');

    try {
        const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        next(); 
    } catch (error) {
        res.status(400).send('invalid token');
        
    }
}