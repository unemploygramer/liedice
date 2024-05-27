import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ThreeD from "./components/ThreeD"
// const socket = io("http://localhost:4000");
const socket = io("https://lit-chamber-08356-37e21c06366f.herokuapp.com/");

// https://lit-chamber-08356-37e21c06366f.herokuapp.com/
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
    const [visibleCard, setVisibleCard] = useState(false);
      const [animationState, setAnimationState] = useState('');
                      const diceAudio = new Audio('/diceRoll.mp3');
                          diceAudio.volume = 0.2;
console.log(visibleCard,"visible card" )
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
                      setRoomName("");
        setCurrentRoom('');
        setAnimationState("");
};

const handleUpdateRoomData = (roomData) => {
  // Insert your existing logic for handling updated room data here
                                                                          setError("");
        setPlayerOneName(roomData.firstPlayer.userName);
       setUserRotation(roomData.currentUser.rotation)
     setFirstPlayer(roomData.firstPlayer.userName)


      // Update the players state variable
      setPlayers(roomData.users);
};

const handleGameStarted = (data) => {
                                                                              setError("");
                                                  diceAudio.play();

  // Insert your existing logic for handling the start of a game here
    // Update the userRotation state with the received rotation data
     setVisibleCard(true);
    setMyDiceAmount(6)
setLoserList([])
    setUserRotation(data.rotation);
    setFirstPlayer(data.firstPlayer);
    setAmountOfDice(data.amountOfDice);
      setGameStarted(true); // Set gameStarted to true when the game starts

  //   setMyDiceAmount(data.amountOfDice);
};

const handleNextPlayer = (data) => {
                                                                              setError("");

    console.log(data,"next player")
  // Insert your existing logic for handling the next player here
  setVisibleCard(true);
      setCurrentGuess(data.currentGuess)
      setFirstPlayer(data.nextPlayer.userName)
          setGuesser(data.guesser) // Add this line

      setResult("")
};

const handleChallengeResult = (data) => {
                                                                              setError("");

  // Insert your existing logic for handling the result of a challenge here
  setVisibleCard(false);
      const { isLie, users, rotation, numberOfDice, nextPlayer, totalDice, message } = data;
  console.log(data,"challenge result")
      // Update the state variables with the received data
      setUserRotation(rotation);
      setMyDiceAmount(numberOfDice);
      setFirstPlayer(nextPlayer);
      setAmountOfDice(totalDice);
      setResult(message);
        if (nextPlayer === userName && gameStarted) {
          setAnimationState('makeAGuess');
        }



};

const handleUpdateRotation = (data) => {
                                                                              setError("");
                  diceAudio.play();

  // Insert your existing logic for handling an update to the rotation here
  setVisibleCard(false);
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
                                                                              setError("");

    setGameStarted(false);
  // Insert your existing logic for handling the end of a game here
  setVisibleCard(false);
      console.log(data,"game over")
      if(data.winner === userName) {
        setResult("You won the game!")
        setFirstPlayer(data.winner)
                setIsWinner(true); // Set isWinner to true when the current user wins

      } else {
        setResult(`${data.winner} won  the game!`)
        setMyDiceAmount(0)

      }
};
  const handleRoomClosed = (data) => {
    // Display the message to the user
    alert(data.message);
    setError(data.message);

    // Reset the room state
  setPlayerOneName('');
  setRoomName('');
  setCurrentRoom('');
  setUserName('');
  setUserRotation([]);
  setFirstPlayer('');
  setCurrentGuess({number:0,amount:0});
  setAmountOfDice(6);
  setMyDiceAmount(6);
  setGameStarted(false);
  setResult('');
  setIsWinner(false);
  setPlayers([]);
  setError(null);
  setLoserList([]);
  setGuesser('');
  setVisibleCard(false);
  };
  socket.on('connect', handleConnect);
  socket.on('error', handleError);
  socket.on('updateRoomData', handleUpdateRoomData);
  socket.on('gameStarted', handleGameStarted);
  socket.on('nextPlayer', handleNextPlayer);
  socket.on('challengeResult', handleChallengeResult);
  socket.on('updateRotation', handleUpdateRotation);
  socket.on('gameOver', handleGameOver);
    socket.on('roomClosed', handleRoomClosed);

  return () => {
    socket.off('connect', handleConnect);
    socket.off('error', handleError);
    socket.off('updateRoomData', handleUpdateRoomData);
    socket.off('gameStarted', handleGameStarted);
    socket.off('nextPlayer', handleNextPlayer);
    socket.off('challengeResult', handleChallengeResult);
    socket.off('updateRotation', handleUpdateRotation);
    socket.off('gameOver', handleGameOver);
        socket.off('roomClosed', handleRoomClosed);


  };

  }, [userName]);

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    if (roomName.trim() !== '' && userName.trim() !== '') {
        setAnimationState('joinRoom');
      // Here you can emit an event to the server to join the room
          setTimeout(() => {
      setCurrentRoom(roomName);
            // Emit the joinRoom event after the delay
      socket.emit('joinRoom', { roomName, userName });
          }, 200); // This should match the duration of your delay

    }
  };

  // Function to start the game
  const startGame = () => {
    // You can emit an event to the server to start the game
      setAnimationState('startGame');


    socket.emit('startGame', roomName);

  };

  return (
    <div className='  h-screen bg-felt w-screen  bg-cover'>
{(!currentRoom || error) && (

<div className="flex justify-center items-center">
          <div className={`bg-gray-800 rounded-xl mt-6 text-white shadow-lg p-6 shadow-lg w-[80vw] max-w-md ${animationState === 'joinRoom' ? 'animate-slideOut' : 'animate-slideIn'}`}>
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
        {`"${currentGuess.amount}  ${currentGuess.number}'s"`}
    </p>
</div>
  )}


{result && visibleCard === false && (
  <div className="w-full flex  justify-center items-center mt-6">
    <div className="bg-gray-800 rounded-lg p-4 w-[80vw] max-w-md border-2 border-white" >
      <h1 className="text-xl text-center font-bold text-red-500">{result}</h1>
    </div>
  </div>
)}
{firstPlayer === userName && gameStarted ? (
<MakeaGuess setVisibleCardState={setVisibleCard} currentGuess={currentGuess} amountOfDice={amountOfDice} myDiceAmount={myDiceAmount} socket={socket} roomName={roomName} userName={userName} animationState={animationState} setAnimationState={setAnimationState} />) : gameStarted ? (
  <div className="w-screen  flex justify-center mt-12">
    <p className="text-4xl text-white font-bold">{firstPlayer}'s Bid</p>
  </div>
) : null}
{players.length >= 2 && (firstPlayer === userName || isWinner) && !gameStarted && currentRoom && (
  <div className='flex justify-center items-center '>
    <button className={`border-2 border-white hover:border-purple-200 m-4 bg-purple-800 hover:bg-purple-700 text-3xl text-white font-bold py-2 px-4 rounded animate-slideIn`} onClick={startGame}>Start Game</button>
  </div>
)}
{currentRoom && players.length < 2 && (
  <div className='flex justify-center items-center mt-4 '>
      <div className="bg-gray-800 rounded p-4 w-[80vw] max-w-[360px]">
    <p className="text-2xl text-white">Waiting for at least one more player...</p>
    </div>
  </div>
)}

           <div className="flex justify-center items-center ">
             {error ? (
               <div className="bg-gray-800 w-[80vw] max-w-[360px] text-center  shadow-md rounded px-8 pt-6 pb-8 mb-4">
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


