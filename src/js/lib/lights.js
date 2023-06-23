import * as THREE from "three";

export const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

export const spotLight = new THREE.SpotLight(0xffffff, 50);
spotLight.position.set(0, 100, 100);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.05;
spotLight.decay = 2;
spotLight.distance = 200;
