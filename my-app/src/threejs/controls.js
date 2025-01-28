import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Add orbit controls to the scene for interaction.
 * @param {THREE.Camera} camera - The camera.
 * @param {THREE.Renderer} renderer - The WebGL renderer.
 * @returns {OrbitControls} - The initialized orbit controls.
 */
export function addOrbitControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth controls
    controls.dampingFactor = 0.05; // Damping factor for smooth interaction
    controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
    return controls;
}
