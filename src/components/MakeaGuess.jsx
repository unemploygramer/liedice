import React, { useState } from 'react';

function MakeaGuess({currentGuess, amountOfDice, socket,roomName,userName,myDiceAmount}) {
    const [visibleCard, setVisibleCard] = useState(null);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const handleButtonClick = (number) => {
        setSelectedNumber(number);
    };

    const numberToWord = (number) => {
        const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
        return words[number];
    };
const sendGuess =(number)=> {
    console.log(userName,"username inside send guess")

   socket.emit('submitGuess', {guess:number, roomName:roomName, userName:userName});

console.log(number,"value inside the send guess")
    }


    const renderButtons = () => {
        let buttons = [];
        for(let i = Math.max(2, currentGuess.number); i <= 6; i++) {
            buttons.push(
              <button
        className="m-2 bg-purple-400 hover:bg-gray-600 text-white rounded px-4 py-2 font-bold"
                  key={i}
                  onClick={() => handleButtonClick(i)}
              >
                  {i}
              </button>
            );
        }
        return buttons;
    };

const renderDiceButtons = () => {
    let buttons = [];
    let start = 1;
    if (selectedNumber === currentGuess.number) {
        start = currentGuess.amount + 1;
    }
    for(let i = start; i <= amountOfDice; i++) {
        let buttonText = `${i} ${numberToWord(selectedNumber)}${i > 1 ? 's' : ''}`;
        buttons.push(
            <button
                className="m-2  bg-purple-800 border-2 border-purple-500 text-white rounded px-4 py-2 font-bold"
                key={i}
                onClick={() => sendGuess({number: selectedNumber, amount: i})}
            >
                {buttonText}
            </button>
        );
    }
    return buttons;
};
// Add this function inside your MakeaGuess component
const challengeGuess = () => {
    const payload = { roomName:roomName, userName:userName};
    socket.emit('challengeGuess', payload);
};

// Add this button inside your return statement
// <button onClick={challengeGuess}>That's a Lie!</button>
    return (
        <div className="w-screen flex justify-center mt-10">
<div className='p-4 flex flex-col shadow-lg rounded-lg w-[80vw] max-w-[620px]  bg-gray-800' style={{ paddingBottom: '50px' }}>
    <div className="w-full  flex justify-center">
    <h2 className="text-white  font-bold">Make Bid</h2>
    </div>
  <div className="text-center mb-4 flex items-center justify-center">
    {currentGuess.number !== 0 && currentGuess.amount !== 0 && (
      <button className="p-4 rounded bg-red-500 text-white text-center" onClick={challengeGuess}>That's a Lie!</button>
    )}
  </div>
  <div className=" bg-gray-700 flex justify-center rounded">

    {renderButtons()}
  </div>
  <div className="flex flex-wrap justify-center text-white max-h-[140px] overflow-y-auto  w-full ">

    {selectedNumber && renderDiceButtons()}

  </div>
</div>
</div>
    );
}

export default MakeaGuess;