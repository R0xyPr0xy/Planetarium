import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ---------------------------------------------- Cube example ----------------------------------------------------

// Set up scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 3;

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Create a cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x753355 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Animate cube
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

// ---------------------------------------------- Line example ----------------------------------------------------
// // Set up renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// //Set up camera
// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// // Create a blue LineBasicMaterial
// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// // Define line points
// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( -5, 10, 0 ) );
// points.push( new THREE.Vector3( 0, 15, 0 ) );
// points.push( new THREE.Vector3( 5, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry, material );

// scene.add( line );
// renderer.render( scene, camera );

// ---------------------------------------------- Imported object example ----------------------------------------------------

// Instantiate a loader
// const loader = new GLTFLoader().setPath( 'public/spiked_ball/' );
// 	loader.load( 'scene.gltf', async function ( gltf ) {

// 		const model = gltf.scene;

// 		// wait until the model can be added to the scene without blocking due to shader compilation

// 		await renderer.compileAsync( model, camera, scene );

// 		scene.add( model );

// 		render();
			
// 		} );

// function render() {
//     renderer.render( scene, camera );   
// }
