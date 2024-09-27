const {socketAuth} = require("./auth/auth");
const {roomMap} = require("./room");

module.exports = (io)=>{

    io.use(socketAuth)

    io.on("connection", (socket)=>{
        console.log("connected");

        socket.on("test", (msg)=>{
            console.log(msg);
        });

        socket.on("joinRoom", (data)=>{
            socket.join(data.roomId);
            roomMap.get(data.roomId).joinedUsers.push(data.user);
            console.log(`Socket joined room: ${data.roomId}`);
        })
    })
}