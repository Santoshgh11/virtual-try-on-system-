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






import React, { useEffect } from 'react';
import * as THREE from 'three'; // Import THREE
import { setupScene, setupCamera, setupRenderer, addLighting } from './threejs/sceneSetup';
import { loadHumanModel, updateAnimation } from './threejs/Avatar';
import { addOrbitControls } from './threejs/controls';

function App() {
    useEffect(() => {
        // Setup scene, camera, and renderer
        const scene = setupScene();
        const camera = setupCamera();
        const renderer = setupRenderer();

        const container = document.getElementById('threejs-container');
        container.appendChild(renderer.domElement);

        // Add lighting
        addLighting(scene);

        // Add controls
        const controls = addOrbitControls(camera, renderer);

        // Load the human model
        loadHumanModel(scene);

        // Animation loop
        const clock = new THREE.Clock(); // Use THREE.Clock for animations
        function animate() {
            const deltaTime = clock.getDelta();
            updateAnimation(deltaTime); // Update animations
            controls.update(); // Update controls
            renderer.render(scene, camera); // Render the scene
            requestAnimationFrame(animate);
        }
        animate();

        return () => {
            container.removeChild(renderer.domElement); // Cleanup
        };
    }, []);

    return (
        <div id="threejs-container" style={{ width: '100%', height: '100vh' }}></div>
    );
}

export default App;





