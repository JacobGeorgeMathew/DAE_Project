import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let i = 0;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Black background
renderer.setPixelRatio(window.devicePixelRatio);

// Enable physically correct lighting
renderer.physicallyCorrectLights = true;

// Enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Create a camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 3, 10); // Better initial position

// Set the target point - this is the center of rotation
const rotationCenter = new THREE.Vector3(0, 0, 0); // Adjust to change rotation axis

// Enhanced orbit controls for full 360° viewing
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;
controls.enableZoom = true; // Allow zooming
controls.zoomSpeed = 1.0;
controls.minDistance = 2; // Allow closer zoom
controls.maxDistance = 20;
controls.enablePan = true; // Allow panning
controls.screenSpacePanning = true; // More intuitive panning
controls.autoRotate = false; // No auto rotation by default
controls.minPolarAngle = 0; // Allow viewing from any angle
controls.maxPolarAngle = Math.PI; // Full 180° vertical rotation
controls.target.copy(rotationCenter); // Set to our custom rotation center
controls.update();

// Create multiple lights for better product visualization
// Main directional light (simulates primary light source)
const mainLight = new THREE.DirectionalLight(0xffffff, 2);
mainLight.position.set(5, 5, 5);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 1024;
mainLight.shadow.mapSize.height = 1024;
scene.add(mainLight);

// Fill light (softens shadows)
const fillLight = new THREE.DirectionalLight(0xffffff, 1);
fillLight.position.set(-5, 3, 0);
scene.add(fillLight);

// Rim light (highlights edges)
const rimLight = new THREE.DirectionalLight(0xffffff, 1);
rimLight.position.set(0, -5, -5);
scene.add(rimLight);

// Replace the textureNames array with materials array
const materials = [
  {
    name: "Wood",
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.1,
    bumpScale: 0.1,
  },
  {
    name: "Redwood",
    color: 0xA0522D,
    roughness: 0.7,
    metalness: 0.1,
  },
  {
    name: "Mahogany",
    color: 0x800000,
    roughness: 0.6,
    metalness: 0.1,
  },
  {
    name: "Gold",
    color: 0xFFD700,
    roughness: 0.2,
    metalness: 1.0,
  },
  {
    name: "Silver",
    color: 0xC0C0C0,
    roughness: 0.3,
    metalness: 1.0,
  },
  {
    name: "Steel",
    color: 0x808080,
    roughness: 0.5,
    metalness: 1.0,
  },
  {
    name: "Diamond",
    color: 0xFFFFFF,
    roughness: 0.1,
    metalness: 0.0,
    transmission: 1.0,
  },
  {
    name: "Ruby",
    color: 0xE0115F,
    roughness: 0.2,
    metalness: 0.0,
    transmission: 0.8,
  },
  {
    name: "Emerald",
    color: 0x50C878,
    roughness: 0.2,
    metalness: 0.0,
    transmission: 0.8,
  },
  {
    name: "Plastic",
    color: 0xFFFFFF,
    roughness: 0.5,
    metalness: 0.0,
  },
  {
    name: "Leaf",
    color: 0x228B22,
    roughness: 0.9,
    metalness: 0.0,
  },
  {
    name: "Fibre",
    color: 0xF5DEB3,
    roughness: 0.8,
    metalness: 0.0,
  },
  {
    name: "Jute",
    color: 0xD2B48C,
    roughness: 0.9,
    metalness: 0.0,
  },
  {
    name: "Silk",
    color: 0xFFF0F5,
    roughness: 0.3,
    metalness: 0.0,
  },
  {
    name: "Blue Diamond Pearl",
    color: 0xADD8E6,
    roughness: 0.1,
    metalness: 0.0,
    transmission: 0.9,
  },
  {
    name: "Platinum",
    color: 0xA5A4A2,
    roughness: 0.2,
    metalness: 1.0,
  },
  {
    name: "Iron",
    color: 0x696969,
    roughness: 0.6,
    metalness: 1.0,
  },
  {
    name: "Copper",
    color: 0xB87333,
    roughness: 0.4,
    metalness: 1.0,
  },
];

/*const loader2 = new THREE.TextureLoader();
  const texture = loader2.load('public/texture/background.jpg', () => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
  });*/

  /*const loader2 = new THREE.CubeTextureLoader();
  const skyboxTextures = loader2.load([
    'public/texture/background.jpg',  // positive x
    'public/texture/leaf.jpg',   // negative x
    'public/texture/Mahagony.jpg',    // positive y
    'public/texture/Ruby.jpg', // negative y
    'public/texture/wood.jpg',  // positive z
    'public/texture/Redwood.jpg'    // negative z
  ]);*/
  
  // Set the skybox as the scene's background
  //scene.background = skyboxTextures;

  /*const sphereGeometry = new THREE.SphereGeometry(0.1);
  const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
  const centerIndicator = new THREE.Mesh(sphereGeometry, sphereMaterial);
  centerIndicator.position.copy(rotationCenter);
  scene.add(centerIndicator);*/


  function createSkyboxManually() {
    const materialArray = [];
    const texture_ft = new THREE.TextureLoader().load('public/texture/whitewall1.jpg');
    const texture_bk = new THREE.TextureLoader().load('public/texture/whitewall1.jpg');
    const texture_up = new THREE.TextureLoader().load('public/texture/ceiling.jpg');
    const texture_dn = new THREE.TextureLoader().load('public/texture/floor.jpg');
    const texture_rt = new THREE.TextureLoader().load('public/texture/whitewall1.jpg');
    const texture_lf = new THREE.TextureLoader().load('public/texture/whitewall1.jpg');
    
    materialArray.push(
      new THREE.MeshBasicMaterial({ map: texture_rt, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ map: texture_lf, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ map: texture_up, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ map: texture_dn, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ map: texture_ft, side: THREE.BackSide }),
      new THREE.MeshBasicMaterial({ map: texture_bk, side: THREE.BackSide })
    );
    
    const skyboxGeo = new THREE.BoxGeometry(60, 60, 72);
    const skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);
  }

// Load and position your 3D model
function loadAndPositionModel() {
  const loader = new GLTFLoader();
  
  loader.load('path/to/your-model.glb', (gltf) => {
    const model = gltf.scene;
    
    // Calculate the bounding box of the model to find its dimensions
    const boundingBox = new THREE.Box3().setFromObject(model);
    const modelHeight = boundingBox.max.y - boundingBox.min.y;
    
    // Position the model at the bottom of the skybox
    // If your skybox is 1000x1000x1000 centered at origin, the floor is at y = -500
    const floorY = -500; // Adjust based on your skybox size
    
    // Position the model so its bottom is at floor level
    model.position.set(0, floorY + (modelHeight / 2) - boundingBox.min.y, 0);
    
    // You may need to scale your model if it's too large or small
    // model.scale.set(10, 10, 10); // Adjust as needed
    
    scene.add(model);
    
    console.log('Model loaded and positioned on floor');
  });
}

  createSkyboxManually();
  loadAndPositionModel();

const loader = new GLTFLoader().setPath('./public/model/');

// Load a single background texture
/*const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('public/texture/background.jpg');
scene.background = backgroundTexture;*/



// Global variable to store the chair mesh
let chairMesh;

// Function to create and apply material
function applyMaterial(materialIndex) {
  const materialData = materials[materialIndex];
  
  // Create a new material with the specified properties
  const material = new THREE.MeshPhysicalMaterial({
    color: materialData.color,
    roughness: materialData.roughness,
    metalness: materialData.metalness,
    transmission: materialData.transmission || 0,
    clearcoat: materialData.clearcoat || 0,
    clearcoatRoughness: materialData.clearcoatRoughness || 0,
    ior: materialData.ior || 1.5, // Index of refraction
    reflectivity: materialData.reflectivity || 0.5,
  });
  
  // Apply the material to all meshes in the chair
  if (chairMesh) {
    chairMesh.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }
  
  // Update the material name display
  const materialNameElement = document.getElementById('material-name');
  if (materialNameElement) {
    materialNameElement.textContent = materialData.name;
  }
}

// Global function to change material randomly
window.Change = function() {
  // Select a random material index
  i = Math.floor(Math.random() * materials.length);
  
  // Apply the random material
  applyMaterial(i);
};

// Global function to go to next material
window.NextTexture = function() {
  // Increment material index, wrapping around to 0 when it reaches the end
  i = (i + 1) % materials.length;
  
  // Apply the next material
  applyMaterial(i);
};

// Global function to go to previous material
window.PreviousTexture = function() {
  // Decrement material index, wrapping around to the last index when it goes below 0
  i = (i - 1 + materials.length) % materials.length;
  
  // Apply the previous material
  applyMaterial(i);
};

// Function to auto-rotate the model
window.ToggleRotation = function() {
  controls.autoRotate = !controls.autoRotate;
  const rotateButton = document.getElementById('rotate-button');
  if (rotateButton) {
    if (controls.autoRotate) {
      rotateButton.textContent = 'Stop Rotation';
    } else {
      rotateButton.textContent = 'Auto Rotate';
    }
  }
};

// Function to reset camera to initial position
window.ResetView = function() {
  camera.position.set(4, 3, 10);
  controls.target.copy(rotationCenter);
  controls.update();
};

// Load the 3D model
loader.load('Chair_1v2.gltf', (gltf) => {
  console.log('Model Loaded:', gltf.scene);
  chairMesh = gltf.scene;
  
  // Position the chair relative to the rotation center
  chairMesh.position.set(-1.8,0,-0.8);
  chairMesh.position.y -= 0.5; // Adjust to center the chair on the rotation point
  
  chairMesh.rotation.set(-Math.PI / 2, 0 , 0.5);
  chairMesh.scale.set(0.005, 0.005, 0.005);

  // Apply initial material
  applyMaterial(i);

  // Enable shadows for all meshes
  chairMesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(chairMesh);

  // Hide loading screen
  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  // Update loading progress
  const percent = Math.floor(xhr.loaded / xhr.total * 100);
  document.getElementById('progress').textContent = `Loading Model: ${percent}%`;
}, (error) => {
  console.error(error);
  document.getElementById('progress').textContent = 'Error Loading Model';
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Required for damping and auto-rotation
  renderer.render(scene, camera);
}

animate();