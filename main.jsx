import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import React from 'react';
import ReactDOM from 'react-dom';

// Set up scene and camera
const scene = new THREE.Scene();
var renderWidth = window.innerWidth * (45 / 100); 
const camera = new THREE.PerspectiveCamera( 75, renderWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 1200;

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( renderWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Set up light
const light = new THREE.DirectionalLight(0xffffff, 2); 
light.position.set(10, 10, 10);
scene.add(light);

// Set up orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let mercuryModel;

// create loader
const loader = new GLTFLoader();
loader.load('/3D-assets/mercury.glb', function(gltf) {
  mercuryModel = gltf.scene;
  scene.add(mercuryModel);
  animate(); // Animate only once model is loaded

}, undefined, function (error) {
  console.error('Error loading GLTF model:', error);
});

// Animate mercury model
function animate() {
  if (mercuryModel) {
  mercuryModel.rotation.x += 0.0002;
  mercuryModel.rotation.y += 0.0002;
  }

  renderer.render( scene, camera );
  requestAnimationFrame(animate);
}
animate();


