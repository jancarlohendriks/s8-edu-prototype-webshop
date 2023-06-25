import * as THREE from "three";

// Create and export the camera setup
export default function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1.0,
    1000
  );
  return camera;
}
