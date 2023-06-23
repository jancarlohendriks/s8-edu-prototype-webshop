import * as THREE from "three";

// Create and export the camera setup
export default function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1.0,
    1000
  );
  // camera.position.set(5.663282429931716, 20, 23.78986740757407);
  // // camera.rotation.set(-1, 20, 1);
  // camera.lookAt();
  // camera.up.set(0, 1, 0);
  // camera.up.set(0, 0, 1)
  // camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}
