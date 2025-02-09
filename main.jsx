import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import React from 'react';
import ReactDOM from 'react-dom';

let planetName = "Mercury";
let stinger = "Nearest planet to the Sun";

let planetNameBox = document.querySelector(".planet-name");
planetNameBox.innerHTML += planetName;

let stingerBox = document.querySelector(".stinger");
stingerBox.innerHTML += stinger;

// Fetch earth distance
async function fetchDistanceToEarth() {
  let url = "https://www.wikidata.org/wiki/Special:EntityData/Q308.json";

  let response = await fetch(url);
  let data = await response.json();

  // Extracting the distance to the earth (AU)
  let distance = data.entities.Q308.claims.P2583[0].mainsnak.datavalue.value.amount;
  let msg = `Distance to Earth : <span class="highlighted">${distance} km </span>`;

  let earthDistBox = document.querySelector(".earth-distance");
  earthDistBox.innerHTML += msg;
}

fetchDistanceToEarth();

// Fetch temperature
async function fetchTemperature() {
  let url = "https://www.wikidata.org/wiki/Special:EntityData/Q308.json";

  let response = await fetch(url);
  let data = await response.json();

  // Extracting temperature
  let temperature = data.entities.Q308.claims.P2076[0].mainsnak.datavalue.value.amount;
  let msg = `Temperature : <span class="highlighted">${temperature} kelvin </span>`;

  let tempBox = document.querySelector(".temperature");
  tempBox.innerHTML += msg;
}

fetchTemperature();

// Fetch radius
async function fetchRadius() {
  let url = "https://www.wikidata.org/wiki/Special:EntityData/Q308.json";

  let response = await fetch(url);
  let data = await response.json();

  // Extracting radius
  let radius = data.entities.Q308.claims.P2120[0].mainsnak.datavalue.value.amount;
  let msg = `Radius : <span class="highlighted">${radius} km </span>`;

  let radiusBox = document.querySelector(".radius");
  radiusBox.innerHTML += msg;
}

fetchRadius();

// Fetch wiki excerpt
let pageTitle = "Mercury_(planet)";
let url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + pageTitle;

async function fetchExcerpt() {
  let f = await fetch(url)
  let j = await f.json()

  let excerptBox = document.getElementById("wiki-excerpt");
  excerptBox.innerHTML += j.extract + " — Wikipedia";
}

fetchExcerpt()

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


