import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/TechnologySection.css';

gsap.registerPlugin(ScrollTrigger);

const TechnologySection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const specs = [
    {
      num: '01',
      title: 'SPATIAL EXPERIENCE',
      desc: 'Engineered for total environmental awareness and spatial precision.'
    },
    {
      num: '02',
      title: 'PRECISION DESIGN',
      desc: 'Every surface, curve, and edge designed with obsessive detail.'
    },
    {
      num: '03',
      title: 'IMMERSIVE DISPLAY',
      desc: 'Visual fidelity that dissolves the boundary between real and virtual.'
    },
    {
      num: '04',
      title: 'INTELLIGENT TRACKING',
      desc: 'Advanced sensing that understands your movement and intent.'
    },
    {
      num: '05',
      title: 'ERGONOMIC FORM',
      desc: 'Balanced, lightweight construction built for extended immersion.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="tech-section" id="technology" ref={sectionRef}>
      <h2 className="tech-headline">BUILT FOR ANOTHER REALITY.</h2>
      <div className="tech-grid">
        {specs.map((spec, index) => (
          <div 
            key={index}
            className="tech-card"
            ref={el => cardsRef.current[index] = el}
            onMouseMove={(e) => handleMouseMove(e, index)}
          >
            <div className="tech-card-glow"></div>
            <div className="tech-card-content">
              <span className="tech-card-num">{spec.num}</span>
              <h3 className="tech-card-title">{spec.title}</h3>
              <p className="tech-card-desc">{spec.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologySection;
