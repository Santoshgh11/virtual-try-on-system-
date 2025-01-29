import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const ModelWithScanning = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const [scanData, setScanData] = useState(null);
  let renderer = null; // Define globally to avoid reassigning

  // ✅ Fetch dimensions from JSON file & handle errors
  const fetchDimensions = async () => {
    try {
      const response = await fetch("dimensions.json");
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      
      const data = await response.json();
      console.log("Fetched Dimensions:", data);
      setScanData(data);
    } catch (error) {
      console.error("Error fetching dimensions.json:", error);
    }
  };

  // ✅ Adjust model size dynamically based on JSON dimensions
  const adjustModelSize = (dimensions) => {
    if (!modelRef.current) return;

    const model = modelRef.current;

    // Extract scanned dimensions
    const shoulderWidth = dimensions["Shoulder Width (cm)"];
    const armLength = dimensions["Arm Length (cm)"];
    const torsoHeight = dimensions["Torso Height (cm)"];
    const torsoWidth = dimensions["Torso Width (cm)"];

    console.log("Applying Dimensions to Model:", dimensions);

    model.traverse((child) => {
      if (child.isMesh) {
        if (child.name.toLowerCase().includes("shoulder")) {
          child.scale.x = shoulderWidth / 46;
        }
        if (child.name.toLowerCase().includes("arm")) {
          child.scale.y = armLength / 64;
        }
        if (child.name.toLowerCase().includes("torso")) {
          child.scale.y = torsoHeight / 78;
          child.scale.x = torsoWidth / 35;
        }
      }
    });
  };

  useEffect(() => {
    fetchDimensions();
  }, []);

  useEffect(() => {
    if (scanData) {
      adjustModelSize(scanData);
    }
  }, [scanData]);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5.8);
    camera.lookAt(new THREE.Vector3(0, 1, 0));

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const loader = new FBXLoader();
    loader.load(
      "/assets/models/human_model.fbx",
      (object) => {
        modelRef.current = object;
        object.scale.setScalar(0.028);
        object.position.set(0, 0, 0);
        object.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = false;
          }
        });

        scene.add(object);
        if (scanData) {
          adjustModelSize(scanData);
        }
      },
      undefined,
      (error) => console.error("Error loading FBX model:", error)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ModelWithScanning;
