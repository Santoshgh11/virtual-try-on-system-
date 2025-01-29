import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three'; // Import the THREE object


export let model = null; // Declare a global variable to store the model
let mixer = null; // Animation mixer for handling animations

/**
 * Load a human model from an .fbx file and add it to the scene.
 * @param {THREE.Scene} scene - The Three.js scene.
 */
export function loadHumanModel(scene) {
    const loader = new FBXLoader();

    loader.load(
        '/assets/models/human_model.fbx', // Path to your .fbx file
        (fbx) => {
            model = fbx; // Assign the loaded model to the global variable
            fbx.scale.set(0.01, 0.01, 0.01); // Adjust the model scale
            fbx.position.set(-4, -3.2, 2); // Position the model to the left side and slightly above the bottom part
            scene.add(fbx);

            // If the model contains animations
            if (fbx.animations && fbx.animations.length > 0) {
                mixer = new THREE.AnimationMixer(fbx); // Initialize the animation mixer
                fbx.animations.forEach((clip) => mixer.clipAction(clip).play()); // Play animations
            }
        },
        undefined,
        (error) => {
            console.error('Error loading the FBX model:', error);
        }
    );
}

/**
 * Update animations for the human model.
 * @param {number} deltaTime - Time elapsed since the last frame.
 */
export function updateAnimation(deltaTime) {
    if (mixer) mixer.update(deltaTime); // Update animations if available
}
