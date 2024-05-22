import { useThree } from '@react-three/fiber';

function CameraControls() {
  const { camera } = useThree();

  // Move the camera back
  camera.position.z = 10;

  return null;
}

export default CameraControls;