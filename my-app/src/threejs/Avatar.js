import * as THREE from 'three'; // Import THREE
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

let mixer; // For animations

export function loadHumanModel(scene) {
    const loader = new FBXLoader();

    loader.load(
        '/assets/models/human_model.fbx', // Path to the .fbx file
        (fbx) => {
            fbx.scale.set(0.01, 0.01, 0.01); // Scale the model
            fbx.position.set(0, 0, 0); // Center the model
            scene.add(fbx);

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

export function updateAnimation(deltaTime) {
    if (mixer) mixer.update(deltaTime); // Update animations
}
