const jwt = require('jsonwebtoken');
const {verifyToken} = require("./auth");
require('dotenv').config();

const secret = process.env.JWT_SECRET

var userAuth = (req, res, next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];  //removing bearer
    if (token == null) return res.sendStatus(401); // No token provided

    verifyToken(token, (err, user) => {
        if (err) return res.status(403).json({message: "Not verified", status: false}); // Forbidden
        
        req.user = user; // Set the user object in request
        next();
    });
}

module.exports ={userAuth}