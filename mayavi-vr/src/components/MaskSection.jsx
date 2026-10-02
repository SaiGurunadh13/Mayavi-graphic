import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroModel } from './HeroModel';
import '../styles/MaskSection.css';

gsap.registerPlugin(ScrollTrigger);

export const MaskSection = () => {
  const sectionRef = useRef(null);
  const labelsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    
    gsap.fromTo(
      labelsRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section className="mask-section" id="design" ref={sectionRef}>
      <div className="mask-header">
        <h2>DESIGNED TO CHANGE YOUR VIEW.</h2>
      </div>

      <div className="mask-canvas-container">
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <spotLight 
              position={[5, 5, 5]} 
              angle={0.15} 
              penumbra={1} 
              intensity={2} 
              color="#00F0FF" 
            />
            <spotLight 
              position={[-5, -5, 5]} 
              angle={0.25} 
              penumbra={1} 
              intensity={1} 
              color="#ffffff" 
            />
            <HeroModel scale={1.5} position={[0, -0.5, 0]} rotation={[0, Math.PI / 4, 0]} />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          </Suspense>
        </Canvas>

        <div className="mask-labels">
          <div 
            className="mask-label mask-label-1" 
            ref={(el) => (labelsRef.current[0] = el)}
          >
            <span>PRECISION OPTICS</span>
            <div className="mask-line"></div>
          </div>
          <div 
            className="mask-label mask-label-2" 
            ref={(el) => (labelsRef.current[1] = el)}
          >
            <div className="mask-line"></div>
            <span>IMMERSIVE VISOR</span>
          </div>
          <div 
            className="mask-label mask-label-3" 
            ref={(el) => (labelsRef.current[2] = el)}
          >
            <span>SIGNATURE DESIGN</span>
            <div className="mask-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaskSection;
