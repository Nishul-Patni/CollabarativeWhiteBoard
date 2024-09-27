var express = require('express');
var roomRouter = express.Router();
const {userAuth} = require("./auth/JWTAuth");

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const roomIDLength = process.env.ROOM_ID_LENGTH;

const roomMap = new Map();

roomRouter.post("/createRoom", userAuth, (req,res)=>{
    let roomId = generateRoomId(roomIDLength);
    while(roomMap.has(roomId))
        roomId = generateRoomId(roomIDLength);

    roomMap.set(roomId, {joinedUsers : [], shapes : []});
    console.log(roomMap)
    res.json({roomId})
})

function generateRoomId(length = 6) {
    // Define characters allowed in the room ID
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789".toUpperCase();

    // Generate a random string of characters
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }

module.exports = {roomRouter, roomMap};