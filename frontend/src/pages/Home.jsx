import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./pages.css";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GoArrowUpRight } from "react-icons/go";
import getStarfield from "../components/StarFields";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";

const Home = () => {
  const mountRef = useRef(null);
  const [loginPop, setLoginPop] = useState(false);
  const [signPop, setSignPop] = useState(false);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 10;

    const scene = new THREE.Scene();

    //Glow Effect
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      1.5,
      0.4,
      100
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 10;
    bloomPass.radius = 0;
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const geometry = new THREE.BoxGeometry(7.5, 7.5, 7.5);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: "#0057ff" });
    const cubeOutline = new THREE.LineSegments(edges, lineMaterial);

    cubeOutline.rotation.z = (23.4 * Math.PI) / 180;
    scene.add(cubeOutline);

    let clock = new THREE.Clock();
    let floatingSpeed = 0.9; // Adjust this value to control the floating speed
    let floatingHeight = 1;

    const stars = getStarfield({ numStars: 200 });
    scene.add(stars);

    const animate = () => {
      requestAnimationFrame(animate);
      cubeOutline.rotation.y += 0.002;
      const time = clock.getElapsedTime();
    cubeOutline.position.y = Math.sin(time * floatingSpeed) * floatingHeight;
      composer.render(scene, camera);
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
      <div className="home-page orbitron-font">
        <nav className="home-page-navigation">
          <div>
            <h2 className="logo-heading">3Dify</h2>
          </div>
          <div className="auth-btns space-x-8">
            
            <button onClick={() => setLoginPop(true)} className="ui-btn ui-wob">
              <span>Login</span>
            </button>
            <span> | </span>
              <button onClick={()=>setSignPop(true)} className="ui-btn ui-wb">
                <span>SignUp</span>
              </button>
          </div>
        </nav>
        <main className="home-page-mainContent space-y-4">
          <h1 className="mainContent-heading">
            3D Visualization, Simplified – Precision in Every Pixel
          </h1>
          <h4 className="mainContent-sub-heading">
            Creating perfection is a journey, not a destination
          </h4>
          <button className="ui-btn ui-wb">
            <span className="btn-span">
              Explore <GoArrowUpRight className="ml-4 text-[22px]" />
            </span>
          </button>
        </main>
        {loginPop && <Login onCancel={() => setLoginPop(false)} />}
        {signPop && <SignUp onCancel={() => setSignPop(false)} />}
      </div>
      <div>
        <div ref={mountRef} />
      </div>
    </>
  );
};

export default Home;
