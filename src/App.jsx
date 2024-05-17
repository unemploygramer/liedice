import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ThreeD from "./components/ThreeD"
const socket = io("http://localhost:4000");
import MakeaGuess from "./components/MakeaGuess"
export default function App() {
  const [playerOneName, setPlayerOneName] = useState('');

  const [roomName, setRoomName] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const [userName, setUserName] = useState('');
  const[userRotation,setUserRotation] = useState([])
  const [firstPlayer,setFirstPlayer] = useState('')
  const [currentGuess,setCurrentGuess] = useState({number:0,amount:0})
  const [amountOfDice,setAmountOfDice] = useState(6)
  const [myDiceAmount,setMyDiceAmount] = useState(6)
  const [result,setResult] = useState('')
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
  // Update the userRotation state with the received rotation data
  console.log(data,"game started")
  setUserRotation(data.rotation);
  setFirstPlayer(data.firstPlayer);
  setAmountOfDice(data.amountOfDice);
//   setMyDiceAmount(data.amountOfDice);
});
socket.on("nextPlayer",(data)=> {
    setCurrentGuess(data.currentGuess)
    setFirstPlayer(data.nextPlayer.userName)
    });

    socket.on("challengeResult", (data) => {
        const { isLie, users } = data;
        if (isLie) {
            // Handle the case where the guess was a lie
        } else {
            // Handle the case where the guess was not a lie
        }

        // Find the current user in the users array and update the userRotation state
        const currentUser = users.find(user => user.userName === userName);
        if (currentUser) {
            setUserRotation(currentUser.rotation);
        }
    });
socket.on("updateRotation",(data)=> {

console.log(data,"rotation update")
  setUserRotation(data.rotation);
  setMyDiceAmount(data.numberOfDice);
  setFirstPlayer(data.nextPlayer);
  setCurrentGuess({number:0,amount:0})
  setAmountOfDice(data.totalDice)
  setResult(data.message)
});

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
<ThreeD userRotations={userRotation} myDiceAmount={myDiceAmount} />
{`current bid ${currentGuess.number}: ${currentGuess.amount}`}
<h1 className="text-5xl">{result}</h1>
{firstPlayer === userName && (
  <MakeaGuess currentGuess={currentGuess} amountOfDice={amountOfDice} myDiceAmount={myDiceAmount} socket={socket} roomName={roomName} userName={userName}  />
)}
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


