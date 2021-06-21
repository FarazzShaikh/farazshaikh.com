import * as THREE from "https://cdn.skypack.dev/three";
import { GLTFLoader } from "https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js";
import particles from "./particles.js";

function map(x, in_min, in_max, out_min, out_max) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export default function plane(scene) {
  const loader = new GLTFLoader();
  let mixer;
  let clock = new THREE.Clock();

  let plane;
  loader.load(
    // resource URL
    "/assets/plane/scene.gltf",
    // called when the resource is loaded
    function (gltf) {
      plane = gltf.scene.children[0];
      plane.scale.set(0.9, 0.9, 0.9);
      plane.rotation.z = Math.PI;

      gltf.scene.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.material.matalness = 0;
          o.material.roughness = 0;
          o.material.shinyness = 1;
          o.material.flatShading = true;
        }
      });

      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });

      scene.add(gltf.scene);
    }
  );

  const targetPos = new THREE.Vector2(0, 1);

  const ele = document.querySelector("canvas");
  function onMove(e) {
    let target = e.target;
    let _x = e.clientX;
    let _y = e.clientY;
    if (e.type === "deviceorientation") {
      _x = e.beta;
      _y = e.gamma;
      target = ele;
    }

    const rect = target.getBoundingClientRect();
    const x = _x - rect.left - rect.width / 2;
    const y = _y - rect.top - rect.height / 2;

    let final_x = map(x, -rect.width / 2, rect.width / 2, -2, 2);
    let final_y = map(y, rect.height / 2, -rect.height / 2, 1.2, 3);

    if (e.type === "deviceorientation") {
      final_x = map(_x, 0, 360, -2, 2);
      final_y = map(_y, 0, 360, 0.7, 3);
    }

    targetPos.x = final_x;
    targetPos.y = final_y;
  }

  ele.addEventListener("mousemove", onMove);
  window.addEventListener("deviceorientation", onMove);

  const particleSystem = particles(scene);

  function animate(dt) {
    if (mixer) {
      var delta = clock.getDelta();
      mixer.update(delta);
    }

    if (plane) {
      plane.position.x += (targetPos.x - plane.position.x) * 0.1;
      plane.position.y += (targetPos.y - plane.position.y) * 0.1;
      plane.rotation.y = (targetPos.x - plane.position.x) * 0.5;
      plane.rotation.x = -Math.PI / 2 + (targetPos.y - plane.position.y);

      particleSystem(plane);
    }
  }

  return animate;
}
