import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Environment, Sparkles, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ─── Sci-Fi / Realistic Geological Layer ─── */
function EarthLayer({ y, radius, height, color, label, children }) {
  return (
    <group position={[0, y, 0]}>
      {/* Back wall of the cut-away earth */}
      <mesh receiveShadow position={[0, 0, -radius/2]}>
        <boxGeometry args={[radius * 2.5, height, radius]} />
        <meshStandardMaterial 
          color={color} 
          roughness={1} 
          metalness={0}
        />
      </mesh>
      
      {/* Grid overlay for aesthetic */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[radius * 2.5, height]} />
        <meshStandardMaterial 
          color="#0057FF" 
          wireframe={true} 
          transparent 
          opacity={0.05}
        />
      </mesh>
      
      {label && (
        <Text
          position={[radius + 0.5, 0, 0.1]}
          fontSize={0.25}
          color="#E8F4FD"
          anchorX="left"
          font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        >
          {label}
        </Text>
      )}

      {/* Insert custom items like jewels or skeletons here */}
      <group position={[0, 0, 0.2]}>
        {children}
      </group>
    </group>
  );
}

/* ─── 3D Jewels ─── */
function Jewels() {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        child.rotation.x = Math.sin(clock.elapsedTime * 0.5 + i) * 0.2;
        child.rotation.y += 0.01;
      });
    }
  });

  const gemColors = ['#ff00ff', '#00ffcc', '#ffcc00', '#ff3366'];
  const gems = [
    { pos: [-1.5, 0.2, 0], scale: 0.3, color: gemColors[0] },
    { pos: [1.8, -0.3, 0.5], scale: 0.4, color: gemColors[1] },
    { pos: [-0.8, -0.4, -0.2], scale: 0.25, color: gemColors[2] },
    { pos: [1.2, 0.4, 0.2], scale: 0.35, color: gemColors[3] },
  ];

  return (
    <group ref={ref}>
      {gems.map((gem, i) => (
        <group key={i} position={gem.pos} scale={gem.scale}>
          <mesh castShadow>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color={gem.color} 
              metalness={0.1} 
              roughness={0.1} 
              emissive={gem.color}
              emissiveIntensity={0.5}
            />
          </mesh>
          <pointLight color={gem.color} intensity={2} distance={3} />
        </group>
      ))}
    </group>
  );
}

/* ─── 3D Skeleton Fossil ─── */
function FossilSkeleton() {
  return (
    <group position={[-1.5, 0, 0.1]} scale={0.4} rotation={[0, 0, -0.2]}>
      {/* Skull */}
      <mesh position={[2, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#d4c8b8" roughness={0.9} />
      </mesh>
      {/* Eye sockets (dark indents) */}
      <mesh position={[2.2, 0.1, 0.4]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#1a1816" />
      </mesh>
      <mesh position={[2.2, 0.1, -0.4]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#1a1816" />
      </mesh>
      
      {/* Spine */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.1, 3, 8]} />
        <meshStandardMaterial color="#c2b6a6" roughness={0.9} />
      </mesh>
      
      {/* Ribs */}
      {[-1, -0.5, 0, 0.5, 1].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Front rib */}
          <mesh position={[0, -0.4, 0.5]} rotation={[0.5, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
            <meshStandardMaterial color="#d4c8b8" roughness={0.9} />
          </mesh>
          {/* Back rib */}
          <mesh position={[0, -0.4, -0.5]} rotation={[-0.5, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
            <meshStandardMaterial color="#d4c8b8" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Realistic Detailed Truck ─── */
function BorewellTruck({ scrollProgress }) {
  const truckRef = useRef();
  const mastRef = useRef();

  // Truck Entrance Animation
  useFrame(({ clock }) => {
    if (!truckRef.current) return;
    const t = clock.elapsedTime;
    
    // Truck drives in from the left (x = -15) to center (x = 0)
    // using a smooth lerp for the first 3 seconds
    if (t < 3) {
      const progress = t / 3;
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      truckRef.current.position.x = -15 + (15 * ease);
    } else {
      truckRef.current.position.x = 0;
    }
    
    // When scroll starts, the rig mast tilts up to vertical
    // Scroll progress 0 to 0.1 controls mast tilt
    if (mastRef.current) {
      const tiltProgress = Math.min(1, Math.max(0, scrollProgress * 10));
      // Start horizontal (Math.PI/2), go to vertical (0)
      mastRef.current.rotation.z = (Math.PI / 2) * (1 - tiltProgress);
    }
  });

  return (
    <group ref={truckRef} position={[-15, 2.85, 0]}>
      {/* Chassis */}
      <mesh position={[-0.5, 0.3, 0]} castShadow>
        <boxGeometry args={[4, 0.4, 1.4]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Cabin */}
      <group position={[-1.8, 1.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 1.2, 1.4]} />
          <meshStandardMaterial color="#0057FF" metalness={0.5} roughness={0.2} />
        </mesh>
        {/* Windshield */}
        <mesh position={[-0.61, 0.2, 0]}>
          <boxGeometry args={[0.05, 0.6, 1.2]} />
          <meshStandardMaterial color="#0A1628" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Wheels */}
      {[-2, -0.5, 1].map((x, i) => (
        <group key={i}>
          {/* Front/Back tires pair */}
          <mesh position={[x, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.3, 24]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
          </mesh>
          <mesh position={[x, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.3, 24]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Rig Mast (Tilts up based on scroll) */}
      <group position={[1.2, 0.5, 0]}>
        <group ref={mastRef} position={[0, 0, 0]}>
          {/* Move anchor point to bottom of the mast */}
          <group position={[0, 2, 0]}>
            {/* Mast frame */}
            <mesh castShadow>
              <boxGeometry args={[0.4, 4, 0.8]} />
              <meshStandardMaterial color="#e6a822" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Inner track */}
            <mesh position={[0.2, 0, 0]}>
              <boxGeometry args={[0.1, 4, 0.4]} />
              <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Stabilizer Legs */}
      <mesh position={[1.2, -0.2, 0.9]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#555" metalness={0.8} />
      </mesh>
      <mesh position={[1.2, -0.2, -0.9]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#555" metalness={0.8} />
      </mesh>
    </group>
  );
}

/* ─── Realistic Metallic Drill Bit ─── */
function DrillBit({ scrollProgress }) {
  const ref = useRef();
  const sparkRef = useRef();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 15;
    }
  });

  // Drill waits for truck mast to tilt up (scroll > 0.1), then lowers
  let drillY = 3.8;
  if (scrollProgress > 0.1) {
    // scale the remaining 0.9 scroll to full depth
    const activeScroll = (scrollProgress - 0.1) / 0.9;
    drillY = 3.8 - activeScroll * 15;
  }
  
  return (
    <group position={[1.2, drillY, 0]}>
      <pointLight color="#0057FF" intensity={1.5} distance={5} />
      
      <group ref={ref}>
        {/* Main drill cone */}
        <mesh castShadow>
          <coneGeometry args={[0.2, 0.8, 16]} />
          <meshStandardMaterial color="#222" metalness={0.95} roughness={0.15} />
        </mesh>
        
        {/* Drill threads */}
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[0.22, 0.7, 8]} />
          <meshStandardMaterial color="#777" metalness={1} roughness={0.2} />
        </mesh>
        
        {/* Pipe extending up to the truck */}
        <mesh position={[0, 10, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 20, 16]} />
          <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Sparks */}
      {scrollProgress > 0.1 && scrollProgress < 0.95 && (
        <Sparkles 
          ref={sparkRef}
          count={50} 
          scale={[1, 0.2, 1]} 
          size={3} 
          speed={0.5} 
          color="#ffaa00" 
        />
      )}
    </group>
  );
}

/* ─── Glowing Water Belt ─── */
function WaterBurst({ scrollProgress }) {
  const ref = useRef();
  const count = 400;
  // Burst heavily in the deepest layer
  const burstIntensity = Math.max(0, (scrollProgress - 0.8) / 0.2);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a massive underground river / pool
      pos[i * 3] = (Math.random() - 0.5) * 6; // X
      pos[i * 3 + 1] = -10 + Math.random() * 2; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4; // Z
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = ref.current.geometry.getAttribute('position');
    
    for (let i = 0; i < count; i++) {
      // Flowing water effect
      posAttr.array[i * 3] += Math.sin(time + i) * 0.01 * burstIntensity;
      posAttr.array[i * 3 + 1] += (Math.cos(time * 2 + i) * 0.01 + 0.02) * burstIntensity;
    }
    posAttr.needsUpdate = true;
  });

  if (burstIntensity <= 0) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#00C2FF" 
        transparent 
        opacity={burstIntensity} 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── High-Tech Depth Tracker ─── */
function HUDPanel({ scrollProgress }) {
  const depth = Math.round(scrollProgress * 500);
  let drillY = 3.8;
  if (scrollProgress > 0.1) {
    drillY = 3.8 - ((scrollProgress - 0.1) / 0.9) * 15;
  }
  
  return (
    <group position={[-2.5, drillY, 0.5]}>
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[1, 0.02, 0.02]} />
        <meshBasicMaterial color="#0057FF" transparent opacity={0.6} />
      </mesh>
      <Text position={[0, 0, 0]} fontSize={0.25} color="#00C2FF" anchorX="right" font="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf">
        {`${depth}m DEPTH`}
      </Text>
      <Text position={[0, -0.25, 0]} fontSize={0.1} color="#7EADD4" anchorX="right">
        DRILL STATUS: {scrollProgress > 0.1 ? (scrollProgress > 0.95 ? 'WATER FOUND' : 'DRILLING') : 'STANDBY'}
      </Text>
    </group>
  );
}

/* ─── Cinematic Camera ─── */
function CameraRig({ scrollProgress }) {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Wait for intro (t < 3s), then follow scroll
    const t = state.clock.elapsedTime;
    if (t < 3) {
      // Pan camera along with the truck arriving
      const progress = t / 3;
      const ease = 1 - Math.pow(1 - progress, 3);
      camera.position.x = -15 + (15 * ease);
      camera.position.y = 5;
    } else {
      let targetY = 5;
      if (scrollProgress > 0.1) {
        // Follow drill down
        targetY = 5 - ((scrollProgress - 0.1) / 0.9) * 15;
      }
      camera.position.y += (targetY - camera.position.y) * 0.1;
      camera.position.x += (1.2 - camera.position.x) * 0.05; // Center on drill X (1.2)
    }
    
    // Always look at the drill
    camera.lookAt(1.2, camera.position.y - 1.5, 0);
  });
  return null;
}

/* ─── The Complete Scene ─── */
function Scene({ scrollProgress }) {
  const layers = [
    { y: 1.5, h: 2, color: '#2a1f18', label: 'TOP SOIL' },
    { y: -0.5, h: 2, color: '#1a1816', label: 'HARD CLAY' },
    { y: -2.5, h: 2, color: '#2b170c', label: 'LATERITE' },
    { y: -4.5, h: 2, color: '#1c1c1c', label: 'FOSSIL ROCK', content: <FossilSkeleton /> },
    { y: -6.5, h: 2, color: '#141414', label: 'SOLID GRANITE' },
    { y: -8.5, h: 2, color: '#101015', label: 'JEWEL STRATA', content: <Jewels /> },
    { y: -10.5, h: 2, color: '#071526', label: 'WATER BELT' },
  ];

  return (
    <>
      <color attach="background" args={['#050a12']} />
      <fog attach="fog" args={['#050a12', 4, 15]} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#dbeaff" castShadow />
      
      {/* Deep blue ambient glow from the bottom water belt */}
      <pointLight position={[1.2, -10.5, 0]} color="#00C2FF" intensity={scrollProgress > 0.7 ? (scrollProgress - 0.7) * 15 : 0} distance={15} />

      <CameraRig scrollProgress={scrollProgress} />
      
      {/* Ground Surface Line */}
      <mesh position={[0, 2.5, -2.5]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a2f16" roughness={1} />
      </mesh>

      <BorewellTruck scrollProgress={scrollProgress} />
      <DrillBit scrollProgress={scrollProgress} />
      
      {layers.map((l, i) => (
        <EarthLayer key={i} y={l.y} radius={3.5} height={l.h} color={l.color} label={l.label}>
          {l.content}
        </EarthLayer>
      ))}
      
      <WaterBurst scrollProgress={scrollProgress} />
      <HUDPanel scrollProgress={scrollProgress} />

      {/* Cinematic Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <DepthOfField focusDistance={0.05} focalLength={0.1} bokehScale={3} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

/* ─── HTML Overlay ─── */
function HeroOverlay({ scrollProgress }) {
  const introOpacity = Math.max(0, 1 - scrollProgress * 4);
  const outroOpacity = Math.max(0, (scrollProgress - 0.85) / 0.15);

  return (
    <div className="hero-overlay">
      <div className="hero-text-block" style={{ opacity: introOpacity, transform: `translateY(${scrollProgress * -100}px)` }}>
        <div className="hero-badge" style={{ backdropFilter: 'blur(10px)', border: '1px solid rgba(0,194,255,0.3)' }}>
          ADVANCED BOREWELL ENGINEERING
        </div>
        <h1 style={{ fontWeight: 800, letterSpacing: '-1px' }}>
          We Dig Deep<br />
          <span style={{ color: '#00C2FF' }}>So You Don't Have To</span>
        </h1>
        <p className="hero-subtitle" style={{ color: '#a0aec0' }}>
          Precision drilling through the toughest geological formations. Watch our rig deploy and reach the deepest water belts.
        </p>
        <div className="hero-scroll-indicator" style={{ marginTop: '40px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Scroll to deploy rig</span>
          <div className="scroll-arrow" style={{ color: '#00C2FF' }}>↓</div>
        </div>
      </div>

      <div className="hero-text-block" style={{ opacity: outroOpacity, pointerEvents: outroOpacity > 0.5 ? 'auto' : 'none' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: 800, textShadow: '0 0 40px rgba(0,194,255,0.8)' }}>
          <span style={{ color: '#fff' }}>WATER BELT</span> <span style={{ color: '#00C2FF' }}>REACHED</span>
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#E8F4FD', maxWidth: '600px', margin: '0 auto 30px' }}>
          Pure, sustainable groundwater ready for extraction.
        </p>
        <a href="/book" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.2rem' }}>Book a Survey Today</a>
      </div>
    </div>
  );
}

export default function Hero3D() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollProgress(progress);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className="hero3d-container" 
      ref={containerRef}
      style={{ height: '600vh', background: '#050a12' }}
    >
      <div className="hero3d-sticky" style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <Canvas
          shadows
          camera={{ position: [-15, 5, 7], fov: 45 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
        <HeroOverlay scrollProgress={scrollProgress} />
      </div>
    </section>
  );
}
