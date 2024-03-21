import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Cylinder from "../components/Cylinder";
import { useSpring, animated } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";

const diceRotations = {
  "1": [[Math.PI / -2, 0, 0]],
  "2": [[0, Math.PI * 1.5, 0]],
  "3": [[Math.PI, 0, 0]],
  "4": [[0, 0, 0]],
  "5": [[0, Math.PI / 2, 0]],
  "6": [[Math.PI / 2, 0, 0]]
};
function rollDice() {
  // Generate a random number from 1 to 6
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  // Convert the random number to a string
  const diceNumber = randomNumber.toString();

  // Return the corresponding rotation from the diceRotations object
  return diceRotations[diceNumber][0];
}

function Dice(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [newRotation, setNewRotation] = useState([0,0,0])

  const [currentRotation, setCurrentRotation] = useState(diceRotations["5"][0]);

  const spring = useSpring({
    from: { rotation: rotation },
    to: { rotation: newRotation },
    config: { tension: 300, friction: 30 },
  });

  const handleClick = () => {
    setActive(!active);
    setNewRotation(rollDice())
    // setRotation(newRotation)
    
  };

  return (
    <animated.mesh
      {...props}
      ref={meshRef}
      rotation={spring.rotation}
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "gray" : "#bf0a0a"} />
      {[...Array(21)].map((_, index) => {
        const { position, rotation } = getPosition(index);
        return <Cylinder key={index} position={position} rotation={rotation} />;
      })}
    </animated.mesh>
  );
}

// Chat gpt trying to make the random rotation fluid 
// function Dice(props) {
//   const meshRef = useRef();
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);

//   const [currentRotation, setCurrentRotation] = useState([0, 0, 0]);

//   const springs = useSpring({
//     rotation: active ? { rotation: getRandomSide() } : { rotation: currentRotation },
//     config: { mass: 1, tension: 180, friction: 12, precision: 0.0001 }
//   });

//   // useFrame(() => {
//   //   setCurrentRotation(springs.rotation.rotation);
//   // });

//   return (
//     <animated.mesh
//       {...props}
//       ref={meshRef}
//       rotation={springs.rotation}
//       onClick={(event) => setActive(!active)}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}
//     >
//       <boxGeometry args={[2, 2, 2]} />
//       <meshStandardMaterial color={hovered ? "gray" : "#bf0a0a"} />
//       {[...Array(21)].map((_, index) => {
//         const { position, rotation } = getPosition(index);
//         return <Cylinder key={index} position={position} rotation={rotation} />;
//       })}
//     </animated.mesh>
//   );
// }

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

const ThreeD = () => {
  return (
    <Canvas>
      <ambientLight />
      <OrbitControls />
      <pointLight position={[10, 10, 10]} />
      <Dice position={[2.5, 0, 0]} />
      <Dice position={[-2.5, 0, 0]} />
      <Dice position={[0, 2.5, 0]} />
      <Dice position={[0, -2.5, 0]} />
      <Dice position={[2.5, 2.5, 0]} />
      <Dice position={[0, 0, 0]} />
    </Canvas>
  );
};

export default ThreeD;


// function getPosition(index) {
//   const positions = [
//     { position: [0.6, 1, 0.6], rotation: [0, 0, 0] }, // Top 
//     { position: [0.6, 1, 0], rotation: [0, 0, 0] }, // Top 
//     { position: [-0.6, 1, 0], rotation: [0, 0, 0] }, // Top 
//     { position: [-0.6, 1, 0.6], rotation: [0, 0, 0] }, // Top 
//     { position: [0.6, 1, -0.6], rotation: [0, 0, 0] }, // Top 
//     { position: [-0.6, 1, -0.6], rotation: [0, 0, 0] }, // Top 
//     { position: [0, -1, 0], rotation: [0, 0, 0] }, // Bottom 1
//     { position: [1, 0.6, 0.6], rotation: [0, 0,Math.PI/2 ] }, // Right 2
//     { position: [1, -0.6, -0.6], rotation: [0, 0,Math.PI/2 ] }, // Right 2
//     { position: [-1, 0, 0], rotation: [0, 0, Math.PI / 2] }, // Left 5
//     { position: [-1, 0.6, 0.6], rotation: [0, 0, Math.PI / 2] }, // Left 5
//     { position: [-1, 0.6, -0.6], rotation: [0, 0, Math.PI / 2] }, // Left 5
//     { position: [-1, -0.6, -0.6], rotation: [0, 0, Math.PI / 2] }, // Left 5
//     { position: [-1, -0.6, 0.6], rotation: [0, 0, Math.PI / 2] }, // Left 5
//     { position: [.6, 0.6, 1], rotation: [Math.PI/2, 0, 0] }, // Front 4
//     { position: [.6, -0.6, 1], rotation: [Math.PI/2, 0, 0] }, // Front 4
//     { position: [-.6, .6, 1], rotation: [Math.PI/2, 0, 0] }, // Front 4
//     { position: [-.6, -.6, 1], rotation: [Math.PI/2, 0, 0] }, // Front 4
//     { position: [0, 0, -1], rotation: [Math.PI/2, 0, 0] }, // Back
//     { position: [-0.6, 0.6, -1], rotation: [Math.PI/2, 0, 0] }, // Back
//     { position: [0.6, -0.6, -1], rotation: [Math.PI/2, 0, 0] }, // Back
//   ];
//   return positions[index];
// }