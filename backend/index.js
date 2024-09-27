const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const {userAuth} = require("./auth/JWTAuth");
const express = require('express')
const { createServer } = require('node:http');
const { Server } = require("socket.io")
const socketHandler = require("./socketHandler.js")
const cors = require("cors")

const OautRouter = require("./auth/oauth.js")
const {roomRouter} = require("./room.js");

const connectToDb = require("./dbConnect.js");

const port = process.env.PORT


const app = express()
app.use(cors());
app.use('/oauth', OautRouter);
app.use("/room", roomRouter);

const server = createServer(app);

//initilizing sockect server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend origin
    methods: ['GET', 'POST'],
    credentials: true,
  }
})

socketHandler(io)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/verifyToken", userAuth, (req, res)=>{
  res.send({message:"Token Verified", status:true, user : req.user})
})

connectToDb()
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})