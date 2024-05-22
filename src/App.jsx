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
  const [gameStarted, setGameStarted] = useState(false);
  const [result,setResult] = useState('This is the result')
    const [isWinner, setIsWinner] = useState(false);

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
    setGameStarted(true); // Set gameStarted to true when the game starts

//   setMyDiceAmount(data.amountOfDice);
});
socket.on("nextPlayer",(data)=> {
    setCurrentGuess(data.currentGuess)
    setFirstPlayer(data.nextPlayer.userName)
    setResult("")
    });

  socket.on("challengeResult", (data) => {
    const { isLie, users, rotation, numberOfDice, nextPlayer, totalDice, message } = data;

    // Update the state variables with the received data
    setUserRotation(rotation);
    setMyDiceAmount(numberOfDice);
    setFirstPlayer(nextPlayer);
    setAmountOfDice(totalDice);
    setResult(message);

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
socket.on("gameOver",(data)=> {
    console.log(data,"game over")
    if(data.winner === userName) {
      setResult("You won the game!")
              setIsWinner(true); // Set isWinner to true when the current user wins

    } else {
      setResult(`${data.winner} the game!`)
      setMyDiceAmount(0)

    }

    });

  }, [userName]);
console.log(firstPlayer,"the first player")
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
    <div className='  h-screen w-screen'>
      {currentRoom === "" &&(
<div className="flex justify-center items-center ">
  <div className="bg-white p-6 rounded shadow-lg w-[80vw] max-w-2xl">
<form onSubmit={handleRoomSubmit}>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomName">
      Room Name
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="roomName"
      type="text"
      placeholder="Enter room name"
      value={roomName} // Link the input to the roomName state variable
      onChange={(e) => setRoomName(e.target.value)} // Update the roomName state variable when the input changes
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
      Username
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="userName"
      type="text"
      placeholder="Enter your username"
      value={userName} // Link the input to the userName state variable
      onChange={(e) => setUserName(e.target.value)} // Update the userName state variable when the input changes
    />
  </div>
  <div className="flex items-center justify-between">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
      Join Room
    </button>
  </div>
</form>
  </div>
</div>

      )}
        {currentRoom && (
  <div>
    <h2>You are currently in room: </h2>
  </div>
)}
<ThreeD userRotations={userRotation} myDiceAmount={myDiceAmount} />
<div className="bg-blue-500 p-4 rounded-lg shadow-md mx-auto max-w-screen-md text-center">
  <p className="text-white font-bold">
    {`current bid ${currentGuess.number}: ${currentGuess.amount}'s'`}
  </p>
</div>

{firstPlayer === userName && gameStarted && (
  <MakeaGuess currentGuess={currentGuess} amountOfDice={amountOfDice} myDiceAmount={myDiceAmount} socket={socket} roomName={roomName} userName={userName}  />
)}
<div className="w-full flex justify-center items-center">
  <h1 className="text-3xl text-center font-bold text-red-500">{result}</h1>
</div>
      {(firstPlayer === userName || isWinner) && gameStarted && (
        <div className=' bg-green w-screen'>
          <button className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startGame}>Start Game</button>
        </div>
      )}
{firstPlayer === userName? (
  <div className=' bg-green w-screen'>

<button className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startGame}>Start Game</button>            </div>
          ) : (
            <p>Player one is: {playerOneName}</p>
          )}
    </div>
  );
}


