import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import models from "./lib/models";
import createCamera from "./lib/camera";
import { createRenderer } from "./lib/renderer";

const stats = new Stats();
document.body.appendChild(stats.dom);

let renderer, scene, controls;
window.currentModelIndex = 0;

const camera = createCamera();

renderer = createRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");

controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

function centerCamera(object) {
  const boundingBox = new THREE.Box3().setFromObject(object);

  const boundingBoxCenter = new THREE.Vector3();
  boundingBox.getCenter(boundingBoxCenter);

  const boundingBoxSize = new THREE.Vector3();
  boundingBox.getSize(boundingBoxSize);

  const distance = Math.max(
    boundingBoxSize.x,
    boundingBoxSize.y,
    boundingBoxSize.z
  );

  const cameraDistance = distance / Math.sin(Math.PI / 8);
  const cameraTarget = new THREE.Vector3();
  boundingBox.getCenter(cameraTarget);

  camera.position.set(cameraDistance, cameraDistance, cameraDistance);
  camera.lookAt(cameraTarget);
}

// Load the GLTF file
const loader = new GLTFLoader();
async function loadModel(index) {
  const modelPath = `./assets/models/${models[index]}.glb?url`;
  const gltf = await loader.loadAsync(modelPath);
  const object = gltf.scene;
  scene.add(object);
  centerCamera(object);
  animate();
  object.position.set(0, -8, 0);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);
window.addEventListener("load", onWindowResize, false);

loadModel(currentModelIndex);

export { scene, loadModel };
