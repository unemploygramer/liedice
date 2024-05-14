import React, { useState } from 'react';

function MakeaGuess({currentGuess, amountOfDice, socket,roomName,userName}) {
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
   socket.emit('submitGuess', {guess:number,roomName:roomName,userName:userName});
console.log(number,"value inside the send guess")
    }


    const renderButtons = () => {
        let buttons = [];
        for(let i = Math.max(2, currentGuess.number); i <= 6; i++) {
            buttons.push(
                <button
                    className="m-2 bg-blue-500 text-white rounded px-4 py-2"
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
        for(let i = 1; i <= amountOfDice; i++) {
            let buttonText = `${i} ${numberToWord(selectedNumber)}${i > 1 ? 's' : ''}`;
            buttons.push(
                <button
                    className="m-2 bg-green-500 text-white rounded px-4 py-2"
                    key={i}
                    onClick={() => sendGuess({number: selectedNumber, amount: i})}
                >
                    {buttonText}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className='p-4 bg-white  flex justify-center shadow-lg rounded-lg w-screen' >
            <div className="bg-indigo-300 ">
                {renderButtons()}
            {selectedNumber && renderDiceButtons()}
            </div>
        </div>
    );
}

export default MakeaGuess;