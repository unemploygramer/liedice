import React from 'react';

const Table = ({ players, firstPlayer, currentRoom, loserList }) => {
  return (
    <div className="flex fixed bottom-0  lg:right-0 w-screen lg:w-auto justify-center lg:justify-end  mb-12 mr-24">
      <div className="bg-green-500 border-2 border-white rounded-full w-32 h-32 lg:w-64 lg:h-64 flex items-center justify-center relative">
        {players.map((player, index) => (
          <div
            key={index}
            className={`absolute text-center text-sm lg:text-lg font-bold text-white rounded p-1 min-w-[50px] flex items-center justify-center ${player === firstPlayer ? 'bg-purple-700' : 'bg-gray-800'}`}
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
        <div className="absolute text-center text-black font-bold text-sm rounded-full w-8 h-8 flex items-center justify-center ">
          {currentRoom}
        </div>
      </div>
    </div>
  );
};

export default Table;