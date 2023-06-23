import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";

import model1 from "@/assets/models/1-male-dark-short-small.gltf?url";
// import model2 from "@/assets/models/2-male-dark-short-regular.gltf?url";
// import model3 from "@/assets/models/3-male-dark-short-big.gltf?url";
// import model4 from "@/assets/models/4-male-dark-mid-small.gltf?url";
// import model5 from "@/assets/models/5-male-dark-mid-regular.gltf?url";
// import model6 from "@/assets/models/6-male-dark-mid-big.gltf?url";
// import model7 from "@/assets/models/7-male-dark-long-small.gltf?url";
// import model8 from "@/assets/models/8-male-dark-long-regular.gltf?url";
// import model9 from "@/assets/models/9-male-dark-long-big.gltf?url";
// import model10 from "@/assets/models/10-male-light-short-small.gltf?url";
// import model11 from "@/assets/models/11-male-light-short-regular.gltf?url";
// import model12 from "@/assets/models/12-male-light-short-big.gltf?url";
// import model13 from "@/assets/models/13-male-light-mid-small.gltf?url";
// import model14 from "@/assets/models/14-male-light-mid-regular.gltf?url";
// import model15 from "@/assets/models/15-male-light-mid-big.gltf?url";
// import model16 from "@/assets/models/16-male-light-long-small.gltf?url";
// import model17 from "@/assets/models/17-male-light-long-regular.gltf?url";
// import model18 from "@/assets/models/18-male-light-long-big.gltf?url";

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
// Initialize variables
let camera,
  renderer,
  scene,
  controls,
  mixer,
  clock,
  currentModelIndex = 0;

// Create the camera
camera = createCamera();

// Create the renderer
renderer = createRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the scene
scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");
scene.add(ambientLight, spotLight);

camera.position.set(5.663282429931716, 20, 23.78986740757407);
camera.rotation.set(-1, 20, 1);
camera.lookAt(scene.position);

// Create the controls
controls = new OrbitControls(camera, renderer.domElement);

// Animate function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

// Load the GLTF file
const loader = new GLTFLoader();
loader.load(model1, function (gltf) {
  const object = gltf.scene;
  scene.add(object);
  animate();
});

const btnPressed = async (e) => {
  currentModelIndex = (currentModelIndex + 1) % models.length;
  scene.remove(scene.children.find((child) => child.type === "Group"));
  const model = await import(
    `@/assets/models/${models[currentModelIndex]}.gltf?url`
  );
  const gltf = await loader.loadAsync(model.default);
  const object = gltf.scene;
  scene.add(object);
  animate();
};

var btn = document.createElement("button");
btn.addEventListener("click", btnPressed);
btn.innerText = "button";
btn.style.background = "red";
btn.style.position = "fixed";
btn.style.right = "0";
document.body.appendChild(btn);

// Update on window resize
window.addEventListener("resize", onWindowResize, false);
window.addEventListener("load", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
