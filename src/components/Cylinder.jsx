import React from "react";

export default function Cylinder({ position,rotation}) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[0.28, 0.2, 0.03, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}