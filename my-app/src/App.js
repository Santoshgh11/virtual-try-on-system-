// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ScanPage from './pages/ScanPage';
// import TryOnPage from './pages/TryOnPage';
// import SuggestionsPage from './pages/SuggestionsPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/scan" element={<ScanPage />} />
//         <Route path="/try-on" element={<TryOnPage />} />
//         <Route path="/suggestions" element={<SuggestionsPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ScanPage from './pages/ScanPage';
// import TryOnPage from './pages/TryOnPage';
// import SuggestionsPage from './pages/SuggestionsPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/scan" element={<ScanPage />} />
//         <Route path="/try-on" element={<TryOnPage />} />
//         <Route path="/suggestions" element={<SuggestionsPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ScanPage from './pages/ScanPage';
// import ResultPage from './pages/ResultPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/scan" element={<ScanPage />} />
//         <Route path="/result" element={<ResultPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






// import React, { useEffect } from 'react';
// import * as THREE from 'three'; // Import THREE
// import { setupScene, setupCamera, setupRenderer, addLighting } from './threejs/sceneSetup';
// import { loadHumanModel, updateAnimation } from './threejs/Avatar';
// import { addOrbitControls } from './threejs/controls';

// function App() {
//     useEffect(() => {
//         // Setup scene, camera, and renderer
//         const scene = setupScene();
//         const camera = setupCamera();
//         const renderer = setupRenderer();

//         const container = document.getElementById('threejs-container');
//         container.appendChild(renderer.domElement);

//         // Add lighting
//         addLighting(scene);

//         // Add controls
//         const controls = addOrbitControls(camera, renderer);

//         // Load the human model
//         loadHumanModel(scene);

//         // Animation loop
//         const clock = new THREE.Clock(); // Use THREE.Clock for animations
//         function animate() {
//             const deltaTime = clock.getDelta();
//             updateAnimation(deltaTime); // Update animations
//             controls.update(); // Update controls
//             renderer.render(scene, camera); // Render the scene
//             requestAnimationFrame(animate);
//         }
//         animate();

//         return () => {
//             container.removeChild(renderer.domElement); // Cleanup
//         };
//     }, []);

//     return (
//         <div id="threejs-container" style={{ width: '100%', height: '100vh' }}></div>
//     );
// }

// export default App;





// import React, { useEffect } from 'react';
// import * as THREE from 'three';
// import { setupScene, setupCamera, setupRenderer, addLighting } from './threejs/sceneSetup';
// import { loadHumanModel, model } from './threejs/Avatar';
// import { addOrbitControls } from './threejs/controls';

// function App() {
//     useEffect(() => {
//         // Setup Scene, Camera, and Renderer
//         const scene = setupScene();
//         const camera = setupCamera();
//         const renderer = setupRenderer();
//         const raycaster = new THREE.Raycaster(); // For detecting objects under the mouse
//         const mouse = new THREE.Vector2(); // To store normalized mouse coordinates
//         let isDragging = false; // Track if the model is being dragged

//         const container = document.getElementById('threejs-container');
//         container.appendChild(renderer.domElement);

//         // Add Lighting
//         addLighting(scene);

//         // Add Controls
//         const controls = addOrbitControls(camera, renderer);

//         // Load the Human Model
//         loadHumanModel(scene);

//         // Drag-and-Drop Logic
//         const handleMouseDown = (event) => {
//             event.preventDefault();

//             // Update mouse coordinates
//             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//             // Perform raycasting
//             raycaster.setFromCamera(mouse, camera);
//             const intersects = raycaster.intersectObject(model, true); // Check intersection with the model

//             if (intersects.length > 0) {
//                 isDragging = true; // Start dragging
//                 controls.enabled = false; // Disable orbit controls during drag
//             }
//         };

//         const handleMouseMove = (event) => {
//             if (!isDragging) return; // Only move the model if dragging

//             event.preventDefault();

//             // Update mouse coordinates
//             mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//             mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//             // Perform raycasting
//             raycaster.setFromCamera(mouse, camera);

//             // Project a plane to move the model
//             const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Horizontal plane
//             const intersectPoint = new THREE.Vector3();
//             raycaster.ray.intersectPlane(plane, intersectPoint); // Find intersection with the plane

//             // Update model position
//             if (model) {
//                 model.position.copy(intersectPoint); // Set the model's position to the intersection point
//             }
//         };

//         const handleMouseUp = (event) => {
//             isDragging = false; // Stop dragging
//             controls.enabled = true; // Re-enable orbit controls
//         };

//         // Add Event Listeners
//         container.addEventListener('mousedown', handleMouseDown);
//         container.addEventListener('mousemove', handleMouseMove);
//         container.addEventListener('mouseup', handleMouseUp);

//         // Animation Loop
//         const clock = new THREE.Clock();
//         function animate() {
//             const deltaTime = clock.getDelta();
//             renderer.render(scene, camera);
//             controls.update(); // Update controls
//             requestAnimationFrame(animate);
//         }
//         animate();

//         // Cleanup Event Listeners on Unmount
//         return () => {
//             container.removeChild(renderer.domElement);
//             container.removeEventListener('mousedown', handleMouseDown);
//             container.removeEventListener('mousemove', handleMouseMove);
//             container.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, []);

//     return <div id="threejs-container" style={{ width: '100%', height: '100vh' }}></div>;
// }

// export default App;


// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// const ThreeScene = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     // Scene setup
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf0f0f0);

//     // Camera setup
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 1, 5.8); // Fixed camera position
//     camera.lookAt(new THREE.Vector3(0, 1, 0)); // Point camera at the model

//     // Renderer setup
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     mountRef.current.appendChild(renderer.domElement);

//     // Lighting setup
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
//     directionalLight.position.set(5, 8, 5);
//     directionalLight.castShadow = true;
//     scene.add(directionalLight);

//     const ambientLight = new THREE.AmbientLight(0x404040, 2);
//     scene.add(ambientLight);

//     // Ground plane
//     const groundGeometry = new THREE.PlaneGeometry(10, 10);
//     const groundMaterial = new THREE.MeshStandardMaterial({
//       color: 0x808080,
//       roughness: 0.8,
//       metalness: 0.2,
//     });
//     const ground = new THREE.Mesh(groundGeometry, groundMaterial);
//     ground.rotation.x = -Math.PI / 2;
//     ground.receiveShadow = true;
//     scene.add(ground);

//     // Load the FBX model
//     const loader = new FBXLoader();
//     let model = null; // Declare the model variable
//     loader.load(
//       '/assets/models/human_model.fbx', // Corrected path to the model
//       (object) => {
//         object.scale.setScalar(0.028); // Adjust scale for visibility
//         object.position.set(0, 0, 0); // Center the model
//         object.traverse((child) => {
//           if (child.isMesh) {
//             child.castShadow = true;
//             child.receiveShadow = false;
//           }
//         });

//         model = object; // Store the loaded model
//         scene.add(object); // Add the model to the scene
//       },
//       undefined,
//       (error) => {
//         console.error('An error occurred loading the model:', error);
//       }
//     );

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Rotate the model if it exists
//       if (model) {
//         model.rotation.y += 0.01; // Rotate around the y-axis
//       }

//       renderer.render(scene, camera); // Render the scene
//     };
//     animate();

//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       mountRef.current?.removeChild(renderer.domElement);
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
// };

// export default ThreeScene;

// import React from "react";
// import ModelWithScanning from "./components/ModelWithScanning";

// const App = () => {
//   return (
//     <div>
//       <h1>3D Body Model</h1>
//       <ModelWithScanning />
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Pages
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import ResultPage from './pages/ResultPage';

// Import Three.js 3D Model Page
import ModelWithScanning from "./components/ModelWithScanning"; // ✅ Import 3D Model Component

function App() {
    const [scanningComplete, setScanningComplete] = useState(false); // ✅ Track scanning status

    return <div id="threejs-container" style={{ width: '100%', height: '100vh' }}></div>;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route 
                    path="/scan" 
                    element={<ScanPage setScanningComplete={setScanningComplete} />} // ✅ Pass scanning status
                />
                <Route path="/result" element={<ResultPage />} />
                <Route 
                    path="/3d-model" 
                    element={scanningComplete ? <ModelWithScanning /> : <p>Scanning is required before viewing the 3D model.</p>} 
                />
            </Routes>
        </Router>
    );
}

export default App;

