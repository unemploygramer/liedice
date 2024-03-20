import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Cylinder from "../components/Cylinder"
import { useSpring, animated } from '@react-spring/three'
import { OrbitControls } from '@react-three/drei'
const diceSides = [
  [0, 0, 0], // Top
  [Math.PI / 2, 0, 0], // Front
  [0, Math.PI / 2, 0], // Right
  [0, -Math.PI / 2, 0], // Left
  [-Math.PI / 2, 0, 0], // Back
  [Math.PI, 0, 0] // Bottom
];
// diceRotations = {
//   // "1": [[Math.PI / 2,0,0]],
//   // 2: {},
//   // 3: {},
//   // 4: {},
//   // 5: {},
//   // 6: {}
// }
const diceRotations = {
  "6": [[Math.PI / 2,0,0]]
}
function getRandomSide() {
  const randomIndex = Math.floor(Math.random() * diceSides.length);
  return diceSides[randomIndex];
}
function getNumberFromRotation(rotation) {
  for (const [number, sideRotation] of Object.entries(diceSides)) {
    if (
      rotation[0].toFixed(2) === sideRotation[0].toFixed(2) &&
      rotation[1].toFixed(2) === sideRotation[1].toFixed(2) &&
      rotation[2].toFixed(2) === sideRotation[2].toFixed(2)
    ) {
      return number;
    }
  }
  return null;
}
function Dice(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const number = 6
  const key = number.toString();
  const DiceRot = diceRotations[key][0]
  const springs = useSpring({
    // rotation: active ? getRandomSide(): [0,Math.PI*.5,0],
    rotation: active ? DiceRot: [Math.PI*2, 0.3, 0],
  })
  // useFrame((state, delta) => {
  //     meshRef.current.rotation.y += delta ;
  //   meshRef.current.rotation.x += delta * 2;
  // });
  // useFrame(() => {
  //   const currentRotation = meshRef.current.rotation.toArray();
  //   const currentNumber = getNumberFromRotation(currentRotation);
  //   if (currentNumber !== null) {
  //     console.log("Current number:", currentNumber);
  //   }
  // });
  const handleClick = () => {
    setActive(!active);
    const currentRotation = meshRef.current.rotation.toArray();
    const currentNumber = getNumberFromRotation(currentRotation);
    if (currentNumber !== null) {
      console.log("Current number:", currentNumber);
    }
  };

  return (
    <animated.mesh
    {...props}
    ref={meshRef}
    rotation={springs.rotation}
    // scale={active ? 1.5 : 1}
    // onClick={(event) => setActive(!active)}
    onClick={handleClick}
    // onPointerOver={(event) => setHover(true)}
    // onPointerOut={(event) => setHover(false)}
    
  
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
      <OrbitControls/>
      <pointLight position={[10, 10, 10]} />
      <Dice position={[2.5, 0, 0]} />
      <Dice position={[-2.5, 0, 0]} />
      <Dice position={[0, 2.5, 0]} />
      <Dice position={[0, -2.5, 0]} />
      <Dice position={[2.5, 2.5, 0]} />
      <Dice  position={[0, 0, 0]} />
      
      {/* Plane to catch shadows */}
      {/* <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="lightblue" />
      </mesh> */}
    </Canvas>
  );
};

export default ThreeD;
