import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Dice(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // useFrame((state, delta) => (meshRef.current.rotation.x += delta * 0.3));

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "gray" : "#bf0a0a"} />
      {[...Array(6)].map((_, index) => (
        <Dot key={index} position={getPosition(index)} />
      ))}
    </mesh>
  );
}

function Dot({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.16, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function getPosition(index) {
  const positions = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  return positions[index];
}

const ThreeD = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Dice />
      
      {/* Plane to catch shadows */}
      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </Canvas>
  );
};

export default ThreeD;
