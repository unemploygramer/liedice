import React from 'react';

const Table = ({ players, firstPlayer ,currentRoom}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-2 ">
      <div className="bg-green-500 border-2 border-white rounded-full w-64 h-64 md:w-64 md:h-64 flex items-center justify-center relative">
        {players.map((player, index) => (
          <div
            key={index}
            className={`absolute text-center text-xl  font-bold text-white rounded p-1 min-w-[50px] md:p-2 flex items-center justify-center ${player === firstPlayer ? 'bg-gray-500' : 'bg-red-500'}`}
style={{
  top: `${50 + Math.sin((index / players.length) * 2 * Math.PI) * 50}%`,
  left: `${50 + Math.cos((index / players.length) * 2 * Math.PI) * 50}%`,
  transform: 'translate(-50%, -50%)'
}}
          >
            {player}
          </div>
        ))}
        <div className="absolute text-center text-black font-bold text-xl md:text-2xl rounded-full w-16 h-16 md:w-32 md:h-32 flex items-center justify-center ">
          {currentRoom}
        </div>
      </div>
    </div>
  );
};

export default Table;