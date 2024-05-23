import React from 'react';

const Table = ({ players, firstPlayer }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-green-500 rounded-full w-64 h-64 flex items-center justify-center relative">
        {players.map((player, index) => (
          <div
            key={index}
            className={`absolute text-center text-white rounded-full w-16 h-16 flex items-center justify-center ${player === firstPlayer ? 'bg-blue-500' : 'bg-red-500'}`}
            style={{
              top: `${50 + Math.sin((index / players.length) * 2 * Math.PI) * 50}%`,
              left: `${50 + Math.cos((index / players.length) * 2 * Math.PI) * 50}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {player}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;