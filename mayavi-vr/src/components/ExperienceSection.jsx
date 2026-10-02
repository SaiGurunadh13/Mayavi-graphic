import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ExperienceSection.css';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: '01',
    title: 'IMMERSION',
    desc: 'A visual experience designed to pull you beyond the screen.',
  },
  {
    id: '02',
    title: 'PRESENCE',
    desc: 'Feel closer to the worlds you enter.',
  },
  {
    id: '03',
    title: 'FREEDOM',
    desc: 'Experience digital spaces from a new perspective.',
  },
];

export const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
      }
    );
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="experience-section" id="experience" ref={sectionRef}>
      <h2 className="experience-header">THE EXPERIENCE</h2>
      
      <div className="experience-grid">
        {cards.map((card, index) => (
          <div 
            className="experience-card" 
            key={card.id}
            ref={(el) => (cardsRef.current[index] = el)}
            onMouseMove={handleMouseMove}
          >
            <div className="experience-card-content">
              <span className="card-number">{card.id}</span>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
