import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroModel from './HeroModel';
import '../styles/FinalCTA.css';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const ctaRef = useRef(null);
  const textRef = useRef(null);
  const brandRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 60%',
        }
      });

      tl.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      })
      .from(brandRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from(btnRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4');
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="final-cta" ref={ctaRef}>
      <div className="cta-canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <spotLight position={[5, 5, 5]} intensity={1} color="#00F0FF" />
            <Environment preset="night" />
            <group rotation={[0, Math.PI / 4, 0]}>
              <HeroModel />
            </group>
          </Suspense>
        </Canvas>
      </div>
      
      <div className="cta-content">
        <div className="cta-glow"></div>
        <h2 className="cta-headline" ref={textRef}>
          REALITY IS<br />ONLY THE<br />BEGINNING.
        </h2>
        <h3 className="cta-brand" ref={brandRef}>MAYAVI</h3>
        <button className="cta-button" ref={btnRef}>
          ENTER MAYAVI &rarr;
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
