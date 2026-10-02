import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ImmersionSection.css';

gsap.registerPlugin(ScrollTrigger);

export const ImmersionSection = () => {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      wordsRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      }
    );
  }, []);

  const text = ["ENTER", "ANOTHER", "WORLD."];

  return (
    <section className="immersion-section" id="immersion" ref={sectionRef}>
      <div className="immersion-particles">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Sparkles count={500} scale={10} size={2} speed={0.4} opacity={0.3} color="#00F0FF" />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="immersion-content">
        <h2 className="immersion-title">
          {text.map((word, index) => (
            <span 
              key={index} 
              className="immersion-word"
              ref={(el) => (wordsRef.current[index] = el)}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default ImmersionSection;
