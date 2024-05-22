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
                    className="m-2 bg-blue-500 text-white rounded px-4 py-2 font-bold"
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
                className="m-2 bg-green-500 text-white rounded px-4 py-2 font-bold"
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
<div className='p-4 flex  flex-col shadow-lg rounded-lg w-screen' style={{ paddingBottom: '50px' }}>
        <div className=" w-full text-center mb-4 flex  items-center justify-center">
    {currentGuess.number !== 0 && currentGuess.amount !== 0 && (
        <button className="p-4 rounded bg-red-500 text-white text-center " onClick={challengeGuess}>That's a Lie!</button>
    )}        </div>
        <div className="bg-indigo-300 flex  justify-center rounded">
            {renderButtons()}
        </div>
        <div className=" flex flex-wrap justify-center">

            {selectedNumber && renderDiceButtons()}
            </div>
    </div>
    );
}

export default MakeaGuess;