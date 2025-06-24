import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Environment, Float, Text3D, Center, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { Headphones, Volume, Wifi } from 'lucide-react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D AirPods Pro Component using GLB model
const AirPodsPro = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load the GLB model
  const { scene } = useGLTF('/air_pods_pro.glb');
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  // Auto-rotation is now handled by OrbitControls

  // Apply materials and hover effects to the model
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Create a realistic white material like in the image
        const material = new THREE.MeshPhysicalMaterial({
          color: hovered ? "#f5f5f7" : "#f8f9fa", // Clean white with slight warmth
          metalness: 0.02, // Very low metalness for plastic look
          roughness: 0.15, // Slightly more rough for realistic plastic
          clearcoat: 0.8, // High clearcoat for glossy finish
          clearcoatRoughness: 0.1, // Smooth clearcoat
          transmission: 0, // No transmission for solid plastic look
          ior: 1.4, // Index of refraction for plastic
          thickness: 1.0,
          emissive: hovered ? new THREE.Color("#e1f5fe") : new THREE.Color("#000000"),
          emissiveIntensity: hovered ? 0.05 : 0,
          envMapIntensity: 0.8, // Environment map reflection intensity
        });
        
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [hovered, clonedScene]);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <group 
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={[1, 1, 1]} // Keep original size
        position={[0, 0, 0]} // Center the model
      >
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
};

// Preload the GLB model for better performance
useGLTF.preload('/air_pods_pro.glb');

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-gray-800/80 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transition: `all 0.6s ease-out ${delay}ms`
      }}
    >
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
          <Icon className="w-6 h-6 text-black" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
          {title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden font-system" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-black">
        {/* Apple-style minimal background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight">
                AirPods
                <span className="block text-white font-light">
                  Pro
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-400 leading-relaxed max-w-lg font-normal">
                Magic like you've never heard. Experience spatial audio that places sound all around you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-all duration-200 text-base">
                  Buy
                </button>
                <button className="px-8 py-3 border border-blue-500 text-blue-500 font-medium rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 text-base">
                  Learn more
                </button>
              </div>
            </div>
            
            {/* 3D Model */}
            <div className="w-full h-96 lg:h-[500px]">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                style={{ background: 'transparent' }}
              >
                <Suspense fallback={null}>
                  <Environment preset="studio" />
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                  <directionalLight position={[-5, 5, 5]} intensity={0.8} color="#ffffff" />
                  <pointLight position={[0, 10, 0]} color="#ffffff" intensity={0.5} />
                  <spotLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" angle={0.3} penumbra={0.2} />
                  
                  <AirPodsPro />
                  
                  <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 4}
                    autoRotate={true}
                    autoRotateSpeed={0.8}
                  />
                </Suspense>
              </Canvas>
              

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6 tracking-tight">
              Engineered for excellence
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Every detail has been carefully crafted to deliver an unparalleled audio experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={Headphones}
              title="Immersive Design"
              description="Ergonomically crafted for all-day comfort with premium materials that feel as good as they sound."
              delay={0}
            />
            
            <FeatureCard
              icon={Volume}
              title="Studio Quality"
              description="Pro-level audio processing with adaptive EQ that automatically tunes music to your ears."
              delay={200}
            />
            
            <FeatureCard
              icon={Wifi}
              title="Seamless Connection"
              description="Effortless pairing and switching between all your Apple devices with the H2 chip."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-900 bg-black">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm font-normal">
            © 2024 AirPods Pro. Experience the future of audio.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
