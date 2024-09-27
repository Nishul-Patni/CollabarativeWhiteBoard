const User = require("../Models/UserModel.js")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.JWT_SECRET;

async function signUp({name, picture, email}){
    // console.log(name, picture, "This is form signup");
    console.log("signup ----");
    const user = new User({name, picture, email});
    await user.save();
    const token = await jwt.sign({name, picture, email}, process.env.JWT_SECRET);
    return token;
}

async function login({name, picture, email}){
    console.log("login ----");
    return await jwt.sign({name, picture, email}, process.env.JWT_SECRET);
}


const verifyToken = (token, callback) => {
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, user);
    });
};

const socketAuth = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error'));
    }

    verifyToken(token, (err, user) => {
        if (err) {
            return next(new Error('Authentication error'));
        }

        socket.user = user; // Store user data in socket object
        next();
    });
};

module.exports = {signUp, login, verifyToken, socketAuth}