import React from 'react';
const Table = ({ players, firstPlayer ,currentRoom, loserList}) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-green-500 border-2 border-white rounded-full w-48 h-48 md:w-48 md:h-48 flex items-center justify-center relative">
        {players.map((player, index) => (
          <div
            key={index}
            className={`absolute text-center text-xl  font-bold text-white rounded p-1 min-w-[50px] md:p-2 flex items-center justify-center ${player === firstPlayer ? 'bg-red-500' : 'bg-purple-500'}`}
            style={{
              top: `${50 + Math.sin((index / players.length) * 2 * Math.PI) * 50}%`,
              left: `${50 + Math.cos((index / players.length) * 2 * Math.PI) * 50}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {player}
            {loserList.includes(player) && <div className="absolute text-red-500 text-2xl font-bold">X</div>}
          </div>
        ))}
        <div className="absolute text-center text-black font-bold text-xl md:text-2xl rounded-full w-12 h-12 md:w-24 md:h-24 flex items-center justify-center ">
          {currentRoom}
        </div>
      </div>
    </div>
  );
};

export default Table;