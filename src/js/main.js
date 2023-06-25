import models from "./lib/models";
import { scene, loadModel } from "./scene";

function btnPressed() {
  window.currentModelIndex = (window.currentModelIndex + 1) % models.length;
  scene.remove(scene.children.find((child) => child.type === "Group"));
  loadModel(window.currentModelIndex);

  const m = models.findIndex(
    (x) => x.includes(skin) && x.includes(height) && x.includes(weight)
  );
  console.log(m);

  // console.log(models.indexOf(m[0]));
  // console.log(skin, height, weight);
}

const skinControl = document.getElementById("skin");
skinControl.addEventListener("change", function (e) {
  // console.log(e.target.value);
  skin = this.value;
});
let skin = skinControl.value;

const heightControl = document.getElementById("height");
heightControl.addEventListener("change", function (e) {
  height = this.value;
});
let height = heightControl.value;

const weightControl = document.getElementById("weight");
weightControl.addEventListener("change", function (e) {
  weight = this.value;
});
let weight = weightControl.value;

const btn = document.getElementById("apply");
btn.addEventListener("click", btnPressed);
