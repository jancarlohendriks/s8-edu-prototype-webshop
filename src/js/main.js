import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";

import { ambientLight, spotLight } from "./lib/lights.js";
import createCamera from "./lib/camera.js";
import { createRenderer } from "./lib/renderer";

const models = [
  "1-male-dark-short-small",
  "2-male-dark-short-regular",
  "3-male-dark-short-big",
  "4-male-dark-mid-small",
  "5-male-dark-mid-regular",
  "6-male-dark-mid-big",
  "7-male-dark-long-small",
  "8-male-dark-long-regular",
  "9-male-dark-long-big",
  "10-male-light-short-small",
  "11-male-light-short-regular",
  "12-male-light-short-big",
  "13-male-light-mid-small",
  "14-male-light-mid-regular",
  "15-male-light-mid-big",
  "16-male-light-long-small",
  "17-male-light-long-regular",
  "18-male-light-long-big",
];

const stats = new Stats();
document.body.appendChild(stats.dom);

let renderer,
  scene,
  controls,
  currentModelIndex = 0;

const camera = createCamera();

renderer = createRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");
scene.add(ambientLight, spotLight);

controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

// Load the GLTF file
const loader = new GLTFLoader();
async function loadModel(index) {
  const modelPath = `./assets/models/${models[index]}.gltf?url`;
  const gltf = await loader.loadAsync(modelPath);
  const object = gltf.scene;
  scene.add(object);

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

  animate();
  object.position.set(0, -8, 0);
}

function btnPressed() {
  currentModelIndex = (currentModelIndex + 1) % models.length;
  scene.remove(scene.children.find((child) => child.type === "Group"));
  const modelPath = `./assets/models/${models[currentModelIndex]}.gltf?url`;
  loader.load(modelPath, function (gltf) {
    const object = gltf.scene;
    scene.add(object);

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
    animate();
    object.position.set(0, -8, 0);
  });
}

const btn = document.createElement("button");
btn.addEventListener("click", btnPressed);
btn.innerText = "button";
btn.style.background = "red";
btn.style.position = "fixed";
btn.style.right = "0";
document.body.appendChild(btn);

window.addEventListener("resize", onWindowResize, false);
window.addEventListener("load", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

loadModel(0);
