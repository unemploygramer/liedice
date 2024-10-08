
import { useSpring, animated } from '@react-spring/three'
import { Canvas, useFrame,useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three';
import { Object3D } from 'three';

import { useRef,useState,Suspense } from 'react';
import Cylinder from "../components/Cylinder"
import {OrbitControls, Plane} from "@react-three/drei"

function MakeaGuess({currentGuess, amountOfDice, socket, roomName, userName, myDiceAmount, setVisibleCardState, animationState, setAnimationState}) {
    const [visibleCard, setVisibleCard] = useState(null);
    const [selectedNumber, setSelectedNumber] = useState(null);
      const [active, setActive] = useState(false);


    const handleButtonClick = (number) => {
        setVisibleCardState(true);

        setSelectedNumber(number);
    };
function Dice(props) {

  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [newRotation, setNewRotation] = useState([0,0,0])
  const spring = useSpring({
    from: { rotation: [0,0,0]},
    to: { rotation: props.userRotations},
    config: { tension: 300, friction: 30 },
  });

  const handleClick = () => {
    setActive(!active);
    // setNewRotation(rollDice())


  };

  return (
    <animated.mesh
      {...props}
      ref={meshRef}
      rotation={spring.rotation}
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
        castShadow // Add this line

    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "red" : "#bf0a0a"} />
      {[...Array(21)].map((_, index) => {
        const { position, rotation } = getPosition(index);
        return <Cylinder key={index} position={position} rotation={rotation} />;
      })}
    </animated.mesh>
  );
}



function getPosition(index) {
  const positions = [
    { position: [0.6, 1, 0.6], rotation: [0, 0, 0] }, // Top
    { position: [0.6, 1, 0], rotation: [0, 0, 0] }, // Top
    { position: [-0.6, 1, 0], rotation: [0, 0, 0] }, // Top
    { position: [-0.6, 1, 0.6], rotation: [0, 0, 0] }, // Top
    { position: [0.6, 1, -0.6], rotation: [0, 0, 0] }, // Top
    { position: [-0.6, 1, -0.6], rotation: [0, 0, 0] }, // Top
    { position: [0, -1, 0], rotation: [0, 0, 0] }, // Bottom 1
    { position: [1, 0.6, 0.6], rotation: [0, 0,Math.PI/2 ] }, // Right 2
    { position: [1, -0.6, -0.6], rotation: [0, 0,Math.PI/2 ] }, // Right 2
    { position: [-1, 0, 0], rotation: [0, 0, Math.PI / 2] }, // Left 5
    { position: [-1, 0.6, 0.6], rotation: [0, 0, Math.PI / 2] }, // Left 5
    { position: [-1, 0.6, -0.6], rotation: [0, 0, Math.PI / 2] }, // Left 5
    { position: [-1, -0.6, -0.6], rotation: [0, 0, Math.PI / 2] }, // Left 5
    { position: [-1, -0.6, 0.6], rotation: [0, 0, Math.PI / 2] }, // Left 5
    { position: [.6, 0.6, 1], rotation: [Math.PI/2, 0, 0] }, // Front 4
    { position: [.6, -0.6, 1], rotation: [Math.PI/2, 0, 0] }, // Front 4
    { position: [-.6, .6, 1], rotation: [Math.PI/2, 0, 0] }, // Front 4
    { position: [-.6, -.6, 1], rotation: [Math.PI/2, 0, 0] }, // Front 4
    { position: [0, 0, -1], rotation: [Math.PI/2, 0, 0] }, // Back
    { position: [-0.6, 0.6, -1], rotation: [Math.PI/2, 0, 0] }, // Back
    { position: [0.6, -0.6, -1], rotation: [Math.PI/2, 0, 0] }, // Back
  ];
  return positions[index];
}

    const numberToWord = (number) => {
        const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
        return words[number];
    };
const sendGuess =(number)=> {
    console.log(userName,"username inside send guess")
        setVisibleCardState(true); // Add this line
  setAnimationState('makeGuess'); // Add this line


    socket.emit('submitGuess', {guess:number, roomName:roomName, userName:userName});



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
        <div className="w-screen flex justify-center mt-2">
<div className={`p-4 flex flex-col shadow-lg rounded-lg w-[80vw] max-w-[420px] bg-gray-800 animate-slideIn`} style={{ paddingBottom: '50px' }}>    <div className="w-full  flex justify-center">
    </div>
  <div className="text-center mb-4 flex items-center justify-center">
    {currentGuess.number !== 0 && currentGuess.amount !== 0 && (
      <button  className="p-2 mt-2 font-bold   rounded bg-red-700 text-white text-center" onClick={challengeGuess}>That's a Lie!</button>
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