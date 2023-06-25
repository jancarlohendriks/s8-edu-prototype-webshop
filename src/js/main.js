import models from "./lib/models";
import { scene, loadModel } from "./scene";

function btnPressed() {
  const index = models.findIndex(
    (model) =>
      model.includes(skin) && model.includes(height) && model.includes(weight)
  );
  scene.remove(scene.children.find((child) => child.type === "Group"));
  loadModel(index);
}

const skinControl = document.getElementById("skin");
let skin = skinControl.value;
skinControl.addEventListener("change", (e) => (skin = e.target.value));

const heightControl = document.getElementById("height");
let height = heightControl.value;
heightControl.addEventListener("change", (e) => (height = e.target.value));

const weightControl = document.getElementById("weight");
let weight = weightControl.value;
weightControl.addEventListener("change", (e) => (weight = e.target.value));

const btn = document.getElementById("apply");
btn.addEventListener("click", btnPressed);
