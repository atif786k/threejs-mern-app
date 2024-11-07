// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const Viewer = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     // Scene Setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 5;

//     // Renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Cube Setup
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Animation Loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Clean Up
//     return () => mountRef.current.removeChild(renderer.domElement);
//   }, []);

//   return <div ref={mountRef} />;
// };

// export default Viewer;

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const Viewer = ({ fileUrl, mtlUrl }) => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     // Basic Scene Setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 5;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Lighting
//     const light = new THREE.DirectionalLight(0xffffff, 1);
//     light.position.set(10, 10, 10).normalize();
//     scene.add(light);

//     // Add controls for user interaction (rotation, zoom, pan)
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.03;
//     // controls.screenSpacePanning = false;
//     // controls.maxPolarAngle = Math.PI / 2;

//     // Load 3D Model (only .obj, no .mtl)
//     // if (fileUrl) {
//     //   const fileExtension = fileUrl.split('.').pop().toLowerCase();

//     //   // Load OBJ models without MTL (just the object)
//     //   if (fileExtension === 'obj') {
//     //     const loader = new OBJLoader();
//     //     loader.load(fileUrl, (object) => {
//     //       // Add basic material to the object
//     //       object.traverse((child) => {
//     //         if (child.isMesh) {
//     //           child.material = new THREE.MeshStandardMaterial({
//     //             color: 0xaaaaaa, // You can change the color
//     //             roughness: 0.5,
//     //             metalness: 0.5,
//     //           });
//     //         }
//     //       });

//     //       scene.add(object);
//     //     }, undefined, (error) => {
//     //       console.error('Error loading OBJ model:', error);
//     //     });
//     //   }
//     //   else {
//     //     console.error('Unsupported file format:', fileExtension);
//     //   }
//     // }

//     if (fileUrl && mtlUrl) {
//       const mtlLoader = new MTLLoader();
//       const objLoader = new OBJLoader();

//       mtlLoader.load(mtlUrl, (materials) => {
//         materials.preload();
//         objLoader.setMaterials(materials);

//         objLoader.load(fileUrl, (object) => {
//           scene.add(object);
//         }, undefined, (error) => {
//           console.error('Error loading OBJ model:', error);
//         });
//       }, undefined, (error) => {
//         console.error('Error loading MTL file:', error);
//       });
//     }

//     // Animation Loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update(); // Update the controls on each frame
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Clean Up
//     return () => mountRef.current.removeChild(renderer.domElement);
//   }, [fileUrl, mtlUrl]);

//   return <div ref={mountRef} />;
// };

// export default Viewer;

// ThreeDViewer.js
// import React, { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// const Viewer = () => {
// const [model, setModel] = useState(null);
// const [fileType, setFileType] = useState("");

// const handleFileUpload = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const fileExtension = file.name.split(".").pop().toLowerCase();
//     setFileType(fileExtension);

//     const url = URL.createObjectURL(file);
//     if (fileExtension === "glb" || fileExtension === "gltf") {
//       const loader = new GLTFLoader();
//       loader.load(url, (gltf) => setModel(gltf.scene));
//     } else if (fileExtension === "obj") {
//       const loader = new OBJLoader();
//       loader.load(url, (obj) => setModel(obj));
//     } else {
//       alert(
//         "Unsupported file type. Please upload a .glb, .gltf, or .obj file."
//       );
//     }
//   }
// };

import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Right One:-
const Viewer = () => {
  const mountRef = useRef(null);
  const location = useLocation();
  const { singleObjData } = location.state || {};

  const objFileUrl = singleObjData.filePath;

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement); //Might change after

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 10;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff)

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const light = new THREE.DirectionalLight(0xffffff, 2.0);
    light.position.set(-1, 10.5, 1.5);
    scene.add(light);

    if (objFileUrl) {
      const fileExtension = objFileUrl.split(".").pop().toLowerCase();

      if (fileExtension === "obj") {
        const loader = new OBJLoader();
        loader.load(
          objFileUrl,
          (object) => {
            const box = new THREE.Box3().setFromObject(object);
            const center = box.getCenter(new THREE.Vector3());

            // Adjust position of the model so it rotates around its center
            object.position.sub(center);
            object.traverse((child) => {
              if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xaaaaaa,
                  roughness: 0.5,
                  metalness: 0.5,
                });
              }
            });
            scene.add(object);
          },
          undefined,
          (error) => {
            console.log("Error loading 3D Model: ", error);
          }
        );
      } else {
        console.log("Unsupported file format: ", fileExtension);
      }
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div className="text-black absolute">
        Hello this is viewers page, where 3D models are rendered
        <li>{singleObjData.name}</li>
        <li>{singleObjData._id}</li>
        <li>{singleObjData.userId}</li>
        <br />
        <br />
      </div>
      <div>
        <div ref={mountRef} />
      </div>
    </>
  );
};

export default Viewer;

// <div style={{ height: "100vh", width: "100%" }}>
//   <input type="file" accept=".obj,.glb,.gltf" onChange={handleFileUpload} />
//   <Canvas style={{ background: "#1e1e1e" }}>
//     <ambientLight intensity={0.5} />
//     <directionalLight position={[5, 5, 5]} intensity={1} />
//     <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
//     {model && <primitive object={model} scale={1} />}
//   </Canvas>
// </div>
