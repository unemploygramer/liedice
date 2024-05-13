
import { useSpring, animated } from '@react-spring/three'
import { Canvas, useFrame} from '@react-three/fiber'
import { useRef,useState } from 'react';
import Cylinder from "../components/Cylinder"
import {OrbitControls} from "@react-three/drei"

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

const ThreeD = ({userRotations}) => {
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
  
  return (
    <div>
      <div className='h-64 w-screen'>

    <Canvas >
      <ambientLight />
      <OrbitControls />
      <pointLight position={[10, 10, 10]} />
      <Dice userRotations={dice1rotation}   position={[2.5, 0, 0]} />





     <Dice userRotations={dice2rotation}   position={[-2.5, 0, 0]} /> 
      <Dice userRotations={dice3rotation}   position={[0, 2.5, 0]} />
      <Dice userRotations={dice4rotation}   position={[0, -2.5, 0]} />
      <Dice  userRotations={dice5rotation}  position={[2.5, 2.5, 0]} />
      <Dice userRotations={dice6rotation}   position={[0, 0, 0]} />  
 
    </Canvas>
      </div>
    </div>
  );
};

export default ThreeD;


