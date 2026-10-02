import React, { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import HeroModel from './HeroModel';
import '../styles/ProductViewer.css';

const ProductViewer = () => {
  const controlsRef = useRef();
  const [autoRotate, setAutoRotate] = useState(true);

  const toggleRotate = () => setAutoRotate(!autoRotate);
  
  const zoomIn = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.z = Math.max(camera.position.z - 0.8, 2);
      controlsRef.current.update();
    }
  };

  const zoomOut = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.z = Math.min(camera.position.z + 0.8, 8);
      controlsRef.current.update();
    }
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <section className="product-viewer-section" id="product">
      <div className="viewer-header">
        <h2 className="viewer-headline">MEET MAYAVI.</h2>
      </div>
      
      <div className="canvas-container">
        <div className="viewer-brand-tag">MAYAVI · 3D HARDWARE VIEWER</div>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <spotLight position={[-10, 10, -5]} intensity={2} color="#00F0FF" />
            <Environment preset="city" />
            <HeroModel />
            <OrbitControls 
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              minDistance={2}
              maxDistance={10}
              autoRotate={autoRotate}
              autoRotateSpeed={2}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="viewer-controls">
        <button onClick={zoomOut} className="control-btn" title="Zoom Out">−</button>
        <button onClick={resetCamera} className="control-btn">RESET</button>
        <button onClick={zoomIn} className="control-btn" title="Zoom In">+</button>
        <button onClick={toggleRotate} className="control-btn">
          {autoRotate ? 'STOP' : 'ROTATE'}
        </button>
      </div>
    </section>
  );
};

export default ProductViewer;
