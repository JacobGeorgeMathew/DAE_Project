import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let i = 0;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

// Array of texture names
const textureNames = ['wood', 'Mahagony', 'Redwood', 'leaf', 'Gold', 'Ruby2', 'Silver', 'Diamond'];

const loader = new GLTFLoader().setPath('./public/model/');
const textureLoader = new THREE.TextureLoader();

// Global variable to store the chair mesh
let chairMesh;

// Function to load and apply texture
function applyTexture(textureName) {
  const texture = textureLoader.load(`public/texture/${textureName}.jpg`);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.7,
    metalness: 0.5
  });

  // Apply the new material to all meshes in the chair
  if (chairMesh) {
    chairMesh.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }
}

// Global function to change texture randomly
window.Change = function() {
  // Select a random texture index
  i = Math.floor(Math.random() * textureNames.length);
  
  // Apply the random texture
  applyTexture(textureNames[i]);
};

// Global function to go to next texture
window.NextTexture = function() {
  // Increment texture index, wrapping around to 0 when it reaches the end
  i = (i + 1) % textureNames.length;
  
  // Apply the next texture
  applyTexture(textureNames[i]);
};

// Global function to go to previous texture
window.PreviousTexture = function() {
  // Decrement texture index, wrapping around to the last index when it goes below 0
  i = (i - 1 + textureNames.length) % textureNames.length;
  
  // Apply the previous texture
  applyTexture(textureNames[i]);
};

loader.load('Chair_1v2.gltf', (gltf) => {
  console.log('Model Loaded:', gltf.scene);
  chairMesh = gltf.scene;
  chairMesh.position.set(-1, 2.40, -1);
  chairMesh.rotation.set(-Math.PI / 2, 0, 0);
  chairMesh.scale.set(0.005, 0.005, 0.005);

  // Apply initial texture
  applyTexture(textureNames[i]);

  chairMesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(chairMesh);

  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
}, (error) => {
  console.error(error);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();