import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, Sparkles } from '@react-three/drei';
import { gsap } from 'gsap';
import HeroModel from './HeroModel';
import '../styles/Hero.css';

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonsRef = useRef(null);

  const handleMouseMove = (e) => {
    // Normalize to -1..1
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    });
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo([textRef.current, subtitleRef.current, taglineRef.current, buttonsRef.current], 
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <section className="hero-section" onMouseMove={handleMouseMove}>
      <div className="hero-canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <color attach="background" args={['#030303']} />
            
            <Environment preset="city" />
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
            <spotLight position={[-5, 5, -5]} intensity={2} color="#00F0FF" penumbra={1} angle={0.5} />
            
            <HeroModel mouse={mouse} scale={2} position={[0, 0, 0]} />
            
            <Sparkles count={100} scale={12} size={1} speed={0.4} opacity={0.5} color="#00F0FF" />
            
            <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000000" position={[0, -2.5, 0]} />
            
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-overlay">
        <div className="hero-content">
          <p className="hero-tagline" ref={taglineRef}>EXPERIENCE THE IMPOSSIBLE</p>
          <h1 className="hero-headline" ref={textRef}>MAYAVI</h1>
          <h2 className="hero-subheadline" ref={subtitleRef}>THE NEXT REALITY.</h2>
          <div className="hero-buttons" ref={buttonsRef}>
            <button className="btn-primary">EXPLORE MAYAVI &rarr;</button>
            <button className="btn-secondary">WATCH EXPERIENCE</button>
          </div>
        </div>
      </div>
    </section>
  );
}
