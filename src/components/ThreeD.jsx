
import { useSpring, animated } from '@react-spring/three'
import { Canvas, useFrame,useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three';
import { Object3D } from 'three';

import { useRef,useState,Suspense } from 'react';
import Cylinder from "../components/Cylinder"
import {OrbitControls, Plane} from "@react-three/drei"

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

const ThreeD = ({userRotations, myDiceAmount}) => {
  let dice1rotation = [0,0,0]
  let dice2rotation = [0,0,0]
  let dice3rotation = [0,0,0]
  let dice4rotation = [0,0,0]
  let dice5rotation = [0,0,0]
  let dice6rotation = [0,0,0]
  if(userRotations[0]) {

  dice1rotation = userRotations[0].rotation
  // dice2rotation = userRotations[1].rotation
  // dice3rotation = userRotations[2].rotation
  // dice4rotation = userRotations[3].rotation
  // dice5rotation = userRotations[4].rotation
  // dice6rotation = userRotations[5].rotation
  }
  if(userRotations[1]) {
  dice2rotation = userRotations[1].rotation


  }
  if(userRotations[2]) {
  dice3rotation = userRotations[2].rotation


  }
  if(userRotations[3]) {
  dice4rotation = userRotations[3].rotation


  }
  if(userRotations[4]) {
  dice5rotation = userRotations[4].rotation


  }
  if(userRotations[5]) {
  dice6rotation = userRotations[5].rotation


  }
    const texture = useLoader(TextureLoader, '/felt.jpg');
    const targetObject = new Object3D();
    targetObject.position.set(0, 0, -10); // Set the position of the target object

  return (
    <div>
      <div className='h-64 w-screen'>
      <Suspense fallback={<div className="bg-red-500 h-screen w-screen">Loading...</div>}>
    <Canvas shadows >
{/*         <OrbitControls /> */}
          <directionalLight
            position={[10, 10, 10]} // Position the key light
            intensity={1.0} // Adjust the brightness of the key light
            castShadow // Enable shadows for the key light
          />
          <directionalLight
            position={[-10, 10, 10]} // Position the fill light
            intensity={0.7} // Adjust the brightness of the fill light
            castShadow // Enable shadows for the fill light
          />
          <directionalLight
            position={[0, -10, 10]} // Position the back light
            intensity={0.8} // Adjust the brightness of the back light
            castShadow // Enable shadows for the back light
          />
{/*         <directionalLight */}
{/*             position={[0, 10, 10]} // Position the light 10 units above, to the right, and in front of the center of the scene */}
{/*             intensity={2.0} // Adjust the brightness of the light */}
{/*             target={targetObject} // Set the target of the light to the target object */}
{/*             castShadow */}
  <Plane
        receiveShadow
        rotation={[-Math.PI / 5, 0, 0]}
        position={[0, -8, 0]}
        args={[30, 30]}

      >
            <meshStandardMaterial attach="material" map={texture} />
      </Plane>


{/*       <pointLight castShadow position={[0, 2, 2]} /> */}

{myDiceAmount > 0 && <Dice userRotations={dice1rotation} position={[2.5, 0, -1]} />}
{myDiceAmount > 1 && <Dice userRotations={dice2rotation} position={[-2.5, 0, -1]} />}
{myDiceAmount > 2 && <Dice userRotations={dice3rotation} position={[0, 2.5, -1]} />}
{myDiceAmount > 3 && <Dice userRotations={dice4rotation} position={[0, -2.5, -1]} />}
{myDiceAmount > 4 && <Dice userRotations={dice5rotation} position={[2.5, 2.5, -1]} />}
{myDiceAmount > 5 && <Dice userRotations={dice6rotation} position={[0, 0, -1]} />}





    </Canvas>
    </Suspense>
      </div>
    </div>
  );
};

export default ThreeD;


