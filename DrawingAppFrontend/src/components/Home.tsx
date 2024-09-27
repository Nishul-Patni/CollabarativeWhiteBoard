import { Container, Button } from '@mui/material'
import React, { useContext } from 'react'
import "./home.css"
import { Link } from "react-router-dom";
import {socket} from "../socket";
import { CanvasContext, CanvasContextPropsObject } from './Context/CanvasContext';
import { UserContext, UserContextPropsObject } from './Context/UserContext'

const Home: React.FC = () =>{

  let {setRoomId} = useContext(CanvasContext) as CanvasContextPropsObject;
  let {user} = useContext(UserContext) as UserContextPropsObject
 
  const handleCreateRoom = async ()=>{
    const myHeaders = new Headers();
    const authToken = localStorage.getItem("token");
    myHeaders.append("Authorization", "Bearer "+authToken);

    let response = await fetch("http://localhost:3000/room/createRoom", {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    })
      .catch((error) => console.error(error));

    const data : {roomId : string} = await response!.json();
    setRoomId(data.roomId)
    socket.auth = {token : authToken};
    socket.connect();
    socket.on("connect", ()=>{
      console.log("connected successfully");
      socket.emit('joinRoom', {user, roomId : data.roomId})
    })
    console.log("clicked");
  }

  const joinRoom = async (roomId : number)=>{

  }

  const handleTest = ()=>{
    console.log("clicked")
    socket.emit("test");
  }

  return (
    <Container sx={{height:"100vh"}} id='home-container'>
        <div id='home-buttons-container'>
            <h3>Welocome to Drawing App</h3>

            <div><Button variant="contained" onClick={handleCreateRoom}>Create Room</Button></div>
            <Link to="/draw">
            <div><Button variant="contained">Just Drawing</Button></div>
            </Link>
            <div id='join-room'>
              <input type="text" maxLength={4} minLength={4} name="roomId" id="room-input" placeholder='Room Id' />
              <Button variant="contained">Join room</Button>
            </div>
            <Button variant='contained' onClick={handleTest}>testing</Button>
        </div>
    </Container>
  )
}

export default Home;


