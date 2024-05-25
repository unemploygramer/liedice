import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ThreeD from "./components/ThreeD"
const socket = io("http://localhost:4000");
import MakeaGuess from "./components/MakeaGuess"
import Table from "./components/Table"
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
  const [result,setResult] = useState('')
    const [isWinner, setIsWinner] = useState(false);
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [loserList,setLoserList] = useState([])
console.log(loserList,"the loser list")
  // Track if the player is the first player

  useEffect(() => {
    socket.on('connect', function () {
      console.log('Client has connected to the server!');
    });
  socket.on('error', (error) => {
    // Set the error message
    setError(error.message);
      setCurrentRoom('');

  });
    // Listen for updated room data
    socket.on('updateRoomData', (roomData) => {

      setPlayerOneName(roomData.firstPlayer.userName);
     setUserRotation(roomData.currentUser.rotation)
   setFirstPlayer(roomData.firstPlayer.userName)


    // Update the players state variable
    setPlayers(roomData.users);
  });

    });
socket.on("gameStarted",(data)=> {
  // Update the userRotation state with the received rotation data
  setMyDiceAmount(6)
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
setLoserList(data.usersOut)
  setUserRotation(data.rotation);
  setMyDiceAmount(data.numberOfDice);
  setFirstPlayer(data.nextPlayerName);
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
    <div className='  h-screen w-screen bg-felt bg-cover'>
      {currentRoom === "" &&(
<div className="flex justify-center items-center">
  <div className="bg-gray-800 mt-6 text-white p-6 rounded shadow-lg w-[80vw] max-w-2xl">
    <form onSubmit={handleRoomSubmit} className="text-white">
      <div className="mb-4">
        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="roomName">
          Room Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
          id="roomName"
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="userName">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
          id="userName"
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button className=" text-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Join Room
        </button>
      </div>
    </form>
  </div>
</div>

      )}

<ThreeD userRotations={userRotation} myDiceAmount={myDiceAmount} />
  {currentGuess.amount > 0 && (
<div className="bg-gray-800 p-4 rounded-lg shadow-md mx-auto max-w-xl text-center  text-white font-bold w-80 mt-6">
    <p className="text-2xl">
      {`${firstPlayer} ${currentGuess.number}: ${currentGuess.amount}'s'`}
    </p>
</div>
  )}

{firstPlayer === userName && gameStarted && (
  <MakeaGuess currentGuess={currentGuess} amountOfDice={amountOfDice} myDiceAmount={myDiceAmount} socket={socket} roomName={roomName} userName={userName}  />
)}
{result && (
  <div className="w-full flex justify-center items-center ">
    <div className="bg-gray-800 rounded p-4 max-w-xl" >
      <h1 className="text-2xl text-center font-bold text-red-500">{result}</h1>
    </div>
  </div>
)}
      {(firstPlayer === userName || isWinner) && !gameStarted && currentRoom && (
        <div className=' bg-green w-screen flex justify-center '>
          <button className="m-4 bg-purple-700 hover:bg-purple-700 text-2xl  text-white font-bold py-2 px-4 rounded" onClick={startGame}>Start Game</button>
        </div>
      )}

           <div className="flex justify-center items-center ">
             {error ? (
               <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                 <h1 className="text-red-500 text-2xl font-bold">{error}</h1>
               </div>
             ) : null}
           </div>

{currentRoom && (
  <div className=" fixed w-screen bottom-6">
    <Table currentRoom={currentRoom} firstPlayer={firstPlayer} players={players} loserList={loserList}/>
  </div>
)}
    </div>
  );
}


