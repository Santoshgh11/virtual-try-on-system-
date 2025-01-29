import * as THREE from 'three';

/**
 * Set up the Three.js scene.
 * @returns {THREE.Scene} - The initialized scene.
 */
export function setupScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee); // Set background color to light gray
    return scene;
}

/**
 * Set up the perspective camera.
 * @returns {THREE.PerspectiveCamera} - The initialized camera.
 */
export function setupCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 1, 0); // Position the camera to fit the model
    return camera;
}

/**
 * Set up the WebGL renderer.
 * @returns {THREE.WebGLRenderer} - The initialized renderer.
 */
export function setupRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Match viewport size
    return renderer;
}

/**
 * Add lighting to the scene.
 * @param {THREE.Scene} scene - The Three.js scene.
 */
export function addLighting(scene) {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight); // Add directional light for shadows

    const ambientLight = new THREE.AmbientLight(0x404040); // Add soft ambient light
    scene.add(ambientLight);
}
