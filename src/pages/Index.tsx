
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { Headphones, Volume, Wifi } from 'lucide-react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D AirPods Pro Component
const AirPodsPro = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Auto-rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // Slow rotation
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
      <group ref={meshRef}>
        {/* Left AirPod */}
        <group position={[-0.8, 0, 0]}>
          {/* Main Earbud Body - more rounded and realistic */}
          <mesh
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshPhysicalMaterial
              color={hovered ? "#f8f8f8" : "#ffffff"}
              metalness={0.05}
              roughness={0.1}
              transmission={0.02}
              thickness={0.1}
              emissive={hovered ? "#3b82f6" : "#000000"}
              emissiveIntensity={hovered ? 0.1 : 0}
            />
          </mesh>
          
          {/* Stem - longer and more realistic */}
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 1.2, 16]} />
            <meshPhysicalMaterial
              color={hovered ? "#f8f8f8" : "#ffffff"}
              metalness={0.05}
              roughness={0.1}
              emissive={hovered ? "#3b82f6" : "#000000"}
              emissiveIntensity={hovered ? 0.1 : 0}
            />
          </mesh>
          
          {/* Speaker Grille */}
          <mesh position={[0.4, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
            <meshPhysicalMaterial
              color="#1a1a1a"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          {/* Microphone holes on stem */}
          <mesh position={[0.08, -0.5, 0.08]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          <mesh position={[-0.08, -0.5, 0.08]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
        
        {/* Right AirPod - mirrored */}
        <group position={[0.8, 0, 0]} rotation={[0, Math.PI, 0]}>
          <mesh
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshPhysicalMaterial
              color={hovered ? "#f8f8f8" : "#ffffff"}
              metalness={0.05}
              roughness={0.1}
              transmission={0.02}
              thickness={0.1}
              emissive={hovered ? "#3b82f6" : "#000000"}
              emissiveIntensity={hovered ? 0.1 : 0}
            />
          </mesh>
          
          <mesh position={[0, -0.8, 0]}>
            <cylinderGeometry args={[0.12, 0.15, 1.2, 16]} />
            <meshPhysicalMaterial
              color={hovered ? "#f8f8f8" : "#ffffff"}
              metalness={0.05}
              roughness={0.1}
              emissive={hovered ? "#3b82f6" : "#000000"}
              emissiveIntensity={hovered ? 0.1 : 0}
            />
          </mesh>
          
          <mesh position={[0.4, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.03, 16]} />
            <meshPhysicalMaterial
              color="#1a1a1a"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          <mesh position={[0.08, -0.5, 0.08]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          <mesh position={[-0.08, -0.5, 0.08]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
            <meshPhysicalMaterial
              color="#2a2a2a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

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
      className={`group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${
        isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        animation: isVisible ? `pulse 3s ease-in-out infinite ${delay}ms, fade-in 0.8s ease-out ${delay}ms` : 'none'
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                AirPods
                <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  Pro
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-md">
                Magic like you've never heard. Experience spatial audio that places sound all around you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
                  Buy Now
                </button>
                <button className="px-8 py-4 border-2 border-gray-600 text-white font-semibold rounded-full hover:border-blue-500 hover:text-blue-400 transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* 3D Model */}
            <div className="h-96 lg:h-[500px] relative">
              <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                className="rounded-2xl"
              >
                <Suspense fallback={null}>
                  <Environment preset="studio" />
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[10, 10, 5]} intensity={1.2} />
                  <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.4} />
                  <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.3} />
                  
                  <AirPodsPro />
                  
                  <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                    autoRotate={false}
                  />
                </Suspense>
              </Canvas>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
                Drag to rotate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Engineered for
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">
            © 2024 AirPods Pro. Experience the future of audio.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
