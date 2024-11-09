import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import "../style.css";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Right One:-
const Viewer = () => {
  const mountRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { singleObjData } = location.state || {};

  const objFileUrl = singleObjData.filePath;

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement); //Might change after

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    singleObjData.name == 'IronMan.obj' ? camera.position.z = 200 : camera.position.z = 2;
    // camera.position.z = 200;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

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

  const goBack = () => {
    navigate(-1);
  };

  const trimmedFileName = (filename) => {
    const TrimmedFileName = filename.replace(/\.[^/.]+$/, "");
    return TrimmedFileName;
  };

  return (
    <>
      <div className="viewer-container orbitron-font space-y-20 text-black absolute">
        <h1 onClick={goBack}
          className="flex items-center cursor-pointer">
          <BsArrowLeft className="mr-4 text-[24px]" />
          Go Back
        </h1>
        <h1 className="text-[36px] capitalize">{trimmedFileName(singleObjData.name)}</h1>
      </div>
      <div>
        <div ref={mountRef} />
      </div>
    </>
  );
};

export default Viewer;
