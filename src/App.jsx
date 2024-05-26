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
    const [guesser,setGuesser] = useState('')

  // Track if the player is the first player

  useEffect(() => {

const handleConnect = () => {
  // Insert your existing logic for handling a successful connection here
  console.log("connected")
};

const handleError = (error) => {
  // Insert your existing logic for handling an error here
      // Set the error message
      setError(error.message);
        setCurrentRoom('');
};

const handleUpdateRoomData = (roomData) => {
  // Insert your existing logic for handling updated room data here

        setPlayerOneName(roomData.firstPlayer.userName);
       setUserRotation(roomData.currentUser.rotation)
     setFirstPlayer(roomData.firstPlayer.userName)


      // Update the players state variable
      setPlayers(roomData.users);
};

const handleGameStarted = (data) => {
  // Insert your existing logic for handling the start of a game here
    // Update the userRotation state with the received rotation data
    setMyDiceAmount(6)

    setUserRotation(data.rotation);
    setFirstPlayer(data.firstPlayer);
    setAmountOfDice(data.amountOfDice);
      setGameStarted(true); // Set gameStarted to true when the game starts

  //   setMyDiceAmount(data.amountOfDice);
};

const handleNextPlayer = (data) => {
  // Insert your existing logic for handling the next player here
      setCurrentGuess(data.currentGuess)
      setFirstPlayer(data.nextPlayer.userName)
          setGuesser(data.guesser) // Add this line

      setResult("")
};

const handleChallengeResult = (data) => {
  // Insert your existing logic for handling the result of a challenge here
      const { isLie, users, rotation, numberOfDice, nextPlayer, totalDice, message } = data;
  console.log(data,"challenge result")
      // Update the state variables with the received data
      setUserRotation(rotation);
      setMyDiceAmount(numberOfDice);
      setFirstPlayer(nextPlayer);
      setAmountOfDice(totalDice);
      setResult(message);
};

const handleUpdateRotation = (data) => {
  // Insert your existing logic for handling an update to the rotation here
  console.log(data,"rotation update")
  setLoserList(data.usersOut)
    setUserRotation(data.rotation);
    setMyDiceAmount(data.numberOfDice);
    setFirstPlayer(data.nextPlayerName);
    setCurrentGuess({number:0,amount:0})
    setAmountOfDice(data.totalDice)
    setResult(data.message)
};

const handleGameOver = (data) => {
  // Insert your existing logic for handling the end of a game here
      console.log(data,"game over")
      if(data.winner === userName) {
        setResult("You won the game!")
                setIsWinner(true); // Set isWinner to true when the current user wins

      } else {
        setResult(`${data.winner} the game!`)
        setMyDiceAmount(0)

      }
};
  socket.on('connect', handleConnect);
  socket.on('error', handleError);
  socket.on('updateRoomData', handleUpdateRoomData);
  socket.on('gameStarted', handleGameStarted);
  socket.on('nextPlayer', handleNextPlayer);
  socket.on('challengeResult', handleChallengeResult);
  socket.on('updateRotation', handleUpdateRotation);
  socket.on('gameOver', handleGameOver);
  return () => {
    socket.off('connect', handleConnect);
    socket.off('error', handleError);
    socket.off('updateRoomData', handleUpdateRoomData);
    socket.off('gameStarted', handleGameStarted);
    socket.off('nextPlayer', handleNextPlayer);
    socket.off('challengeResult', handleChallengeResult);
    socket.off('updateRotation', handleUpdateRotation);
    socket.off('gameOver', handleGameOver);
  };

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
  <div className="bg-gray-800 rounded-xl  mt-6 text-white p-6 shadow-lg w-[80vw] max-w-md">
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
        <button className=" text-md bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Join Room
        </button>
      </div>
    </form>
  </div>
</div>

      )}

<ThreeD userRotations={userRotation} myDiceAmount={myDiceAmount} />
  {currentGuess.amount > 0 && (
<div className="border-2 border-white bg-gray-800 p-2 rounded-lg shadow-md mx-auto text-center text-white font-bold max-w-[300px]  mt-2 flex flex-row items-center justify-center">
    <div className="text-gray-500 text-lg">
        {guesser}
    </div>
    <p className="text-xl text-purple-400">
        {`"${currentGuess.amount} ${currentGuess.number}'s"`}
    </p>
</div>
  )}


{result && (
  <div className="w-full flex  justify-center items-center mt-6">
    <div className="bg-gray-800 rounded-lg p-4 w-[80vw] max-w-md border-2 border-white" >
      <h1 className="text-xl text-center font-bold text-red-500">{result}</h1>
    </div>
  </div>
)}
{firstPlayer === userName && gameStarted ? (
  <MakeaGuess currentGuess={currentGuess} amountOfDice={amountOfDice} myDiceAmount={myDiceAmount} socket={socket} roomName={roomName} userName={userName}  />
) : (
  <div className="w-screen  flex justify-center mt-12">
    <p className="text-4xl text-white font-bold">{firstPlayer}'s Bid</p>
  </div>
)}
      {(firstPlayer === userName || isWinner) && !gameStarted && currentRoom && (
        <div className=' fixed top-0  h-screen w-screen flex justify-center items-center '>
          <button className=" border-2 border-white hover:border-purple-200  m-4 bg-purple-800 hover:bg-purple-700 text-3xl  text-white font-bold py-2 px-4 rounded" onClick={startGame}>Start Game</button>
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

    <Table currentRoom={currentRoom} firstPlayer={firstPlayer} players={players} loserList={loserList}/>

)}
    </div>
  );
}


