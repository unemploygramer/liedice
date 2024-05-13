import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ThreeD from "./components/ThreeD"
const socket = io("http://localhost:4000");

export default function App() {
  const [playerOneName, setPlayerOneName] = useState('');

  const [roomName, setRoomName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [userName, setUserName] = useState('');
  const[userRotation,setUserRotation] = useState([])
  const [firstPlayer,setFirstPlayer] = useState('')
  // Track if the player is the first player
  useEffect(() => {
    socket.on('connect', function () {
      console.log('Client has connected to the server!');
    });

    // Listen for updated room data
    socket.on('updateRoomData', (roomData) => {

      setPlayerOneName(roomData.firstPlayer.userName);
     setUserRotation(roomData.currentUser.rotation)
   setFirstPlayer(roomData.firstPlayer.userName)

      // setCurrentRoom(roomData);
      // console.log(roomData.currentUser.rotation,"room data")
      // setUserRotation(roomData.currentUser.rotation)
      
      // Check if the current user is the first player
    });
    socket.on("gameStarted",(data)=> {
console.log(data,"game started")
    // Update the userRotation state with the received rotation data
    setUserRotation(data.rotation);
    console.log(userRotation)
    })
  }, [userName]);

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    if (roomName.trim() !== '' && userName.trim() !== '') {
      setCurrentRoom(roomName);
      // Here you can emit an event to the server to join the room
      socket.emit('joinRoom', { roomName, userName });
    }
  };

  // Function to start the game
  const startGame = () => {
    // You can emit an event to the server to start the game
    socket.emit('startGame', roomName);
  };

  return (
    <div className='bg-slate-500 h-screen w-screen'>
      <h1 className='text-red-500 text-5xl'>Lie Dice</h1>
      {currentRoom === "" &&(
      <form onSubmit={handleRoomSubmit}>
        <input
          type='text'
          placeholder='Enter room name'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter your username'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />


<button type='submit'>Join Room</button>
      </form>

      )}
        {currentRoom && (
  <div>
    <h2>You are currently in room: </h2>
  </div>
)}
<ThreeD userRotations={userRotation}/>
{firstPlayer === userName? (
  <div className='h-screen bg-green w-screen'>

            <button  onClick={startGame}>Start Game</button>
            </div>
          ) : (
            <p>Player one is: {playerOneName}</p>
          )}
    </div>
  );
}


