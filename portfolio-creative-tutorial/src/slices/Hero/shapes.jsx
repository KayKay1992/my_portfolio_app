"use client"; // Recommended for Next.js apps using Three.js to ensure client-side rendering

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0 justify-center items-center">
      {/* Main Three.js canvas that hosts the 3D scene */}
      <Canvas
        className="z-0"
        shadows // Enable shadow system
        gl={{ antialias: false }} // Disable antialiasing for performance
        dpr={[1, 1.5]} // Device pixel ratio (for handling high-res displays)
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }} // Camera settings
      >
        {/* Suspense boundary for async loading */}
        <Suspense fallback={null}>
          <Geometries /> {/* Main component containing 3D objects */}
          <ContactShadows
            position={[0, -3.5, 0]} // Position below objects
            opacity={0.65} // Shadow transparency
            scale={40} // Shadow area size
            blur={1} // Shadow edge softness
            far={9} // Shadow render distance
          />
          {/* HDRI environment for realistic lighting */}
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  // Array of different 3D geometries with their positions and sizes
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(3), // 20-sided shape
    },
    {
      position: [1, -0.75, 4],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill shape
    },
    {
      position: [-1.4, 2, -4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5), // 12-sided shape (like a football)
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut shape
    },
    {
      position: [1.6, 1.6, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // 8-sided shape (diamond)
    },
  ];

  // Array of different materials for the geometries
  const materials = [
    new THREE.MeshNormalMaterial(), // Material that shows surface normals as colors
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }), // Smooth green
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }), // Matte yellow
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }), // Slightly rough red
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }), // Slightly rough purple
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }), // Slightly rough teal
    new THREE.MeshStandardMaterial({ // Metallic blue
      color: 0x2980b9,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({ // Metallic dark blue
      color: 0x2c3e50,
      roughness: 0,
      metalness: 0.5,
    }),
  ];

  // Render each geometry with its properties
  return geometries.map(({ position, r, geometry }) => (
    <Goemetry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)} // Scale up positions
      geometry={geometry}
      materials={materials}
      r={r} // Size factor
    />
  ));
}

function Goemetry({ r, position, geometry, materials }) {
  const meshRef = useRef(); // Reference to the mesh for animations
  const [visible, setVisible] = useState(false); // Visibility state

  // Get a random material from the materials array
  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  // Handle click on the geometry
  function handleClick(e) {
    const mesh = e.object;

    // Animate rotation on click with random values
    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1,0.3)", // Elastic easing for bouncy effect
      yoyo: true, // Makes the animation reverse after completing
    });

    // Change to a random material on click
    mesh.material = getRandomMaterial();
  }

  // Change cursor on hover
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  // Animation on component mount
  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      // Scale up animation from 0
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1,o.3)",
        delay: 0.3,
      });
    });
    return () => ctx.revert(); // Cleanup animations
  }, []);

  return (
    <group position={position} ref={meshRef}>
      {/* Float wrapper for hover animation */}
      <Float 
        speed={5 * r} // Rotation speed based on size
        rotationIntensity={6 * r} // Rotation amount based on size
        floatIntensity={5 * r} // Float height based on size
      >
        {/* The actual 3D mesh */}
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}