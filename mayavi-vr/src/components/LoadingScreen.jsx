import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({ progress, loaded }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (loaded && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        }
      });
    }
  }, [loaded]);

  return (
    <div className="loading-screen" ref={containerRef}>
      <div className="loading-content">
        <h1 className="loading-title">MAYAVI</h1>
        <p className="loading-subtitle">INITIALIZING REALITY...</p>
        <div className="loading-progress-container">
          <div className="loading-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="loading-percentage">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
