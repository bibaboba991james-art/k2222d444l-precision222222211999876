import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';

export default function CrownViewer3D() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const crownRef = useRef(null);
  const frameRef = useRef(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotVelocity = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(4.5);

  const [activeTab, setActiveTab] = useState('zirconia');

  const materials = {
    zirconia: {
      label: 'Цирконий',
      color: 0xf0f0f0,
      roughness: 0.15,
      metalness: 0.05,
      emissive: 0x111111,
    },
    metal: {
      label: 'Металл',
      color: 0xc8c8c8,
      roughness: 0.3,
      metalness: 0.85,
      emissive: 0x050505,
    },
    ceramic: {
      label: 'Керамика',
      color: 0xfaf5f0,
      roughness: 0.08,
      metalness: 0.0,
      emissive: 0x0a0808,
    },
  };

  const buildCrown = (scene, matConfig) => {
    const group = new THREE.Group();

    const mat = new THREE.MeshStandardMaterial({
      color: matConfig.color,
      roughness: matConfig.roughness,
      metalness: matConfig.metalness,
      emissive: matConfig.emissive,
    });

    // --- Occlusal surface (top bumpy cusp area) ---
    const topGeo = new THREE.SphereGeometry(0.72, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const top = new THREE.Mesh(topGeo, mat);
    top.position.y = 0.55;
    top.scale.set(1.25, 0.7, 1.0);
    group.add(top);

    // Cusps (4 bumps on top)
    const cuspPositions = [
      [0.28, 0.98, 0.22],
      [-0.28, 0.98, 0.22],
      [0.28, 0.98, -0.22],
      [-0.28, 0.98, -0.22],
    ];
    cuspPositions.forEach(([x, y, z]) => {
      const g = new THREE.SphereGeometry(0.22, 24, 18);
      const c = new THREE.Mesh(g, mat);
      c.position.set(x, y, z);
      group.add(c);
    });

    // Central fossa (slight dip — negative cusp)
    const fossaGeo = new THREE.SphereGeometry(0.18, 20, 16);
    const fossa = new THREE.Mesh(fossaGeo, mat);
    fossa.position.set(0, 0.92, 0);
    group.add(fossa);

    // --- Body (main crown body, tapered cylinder) ---
    const bodyGeo = new THREE.CylinderGeometry(0.82, 0.65, 1.3, 48, 8, false);
    // Slightly deform for realistic crown taper
    const posAttr = bodyGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      const angle = Math.atan2(posAttr.getZ(i), posAttr.getX(i));
      const bulge = 1 + 0.06 * Math.sin(angle * 2 + 0.5) * (y / 1.3 + 0.5);
      posAttr.setX(i, posAttr.getX(i) * bulge);
      posAttr.setZ(i, posAttr.getZ(i) * bulge);
    }
    bodyGeo.computeVertexNormals();
    const body = new THREE.Mesh(bodyGeo, mat);
    body.position.y = -0.05;
    body.scale.set(1.0, 1.0, 0.82);
    group.add(body);

    // --- Margin line (subtle ridge at cervical border) ---
    const marginGeo = new THREE.TorusGeometry(0.65, 0.04, 12, 64);
    const marginMat = new THREE.MeshStandardMaterial({
      color: matConfig.color,
      roughness: matConfig.roughness + 0.1,
      metalness: matConfig.metalness,
    });
    const margin = new THREE.Mesh(marginGeo, marginMat);
    margin.position.y = -0.72;
    margin.rotation.x = Math.PI / 2;
    margin.scale.set(1.0, 0.82, 1.0);
    group.add(margin);

    // --- Preparation stump (base) ---
    const prepGeo = new THREE.CylinderGeometry(0.62, 0.55, 0.4, 36, 1, false);
    const prepMat = new THREE.MeshStandardMaterial({
      color: 0x8a7060,
      roughness: 0.6,
      metalness: 0.05,
    });
    const prep = new THREE.Mesh(prepGeo, prepMat);
    prep.position.y = -1.1;
    prep.scale.set(1.0, 1.0, 0.82);
    group.add(prep);

    group.position.y = 0.1;
    scene.add(group);
    return group;
  };

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = el.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0.5, zoomRef.current);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambient = new THREE.AmbientLight(0x8ab4c8, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00e5ff, 0.6);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, -3, -5);
    scene.add(rimLight);

    // Build crown
    const mat = materials[activeTab];
    crownRef.current = buildCrown(scene, mat);

    // Subtle ground reflection plane
    const planeGeo = new THREE.PlaneGeometry(6, 6);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x0a1628,
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.4;
    scene.add(plane);

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isDragging.current && crownRef.current) {
        rotVelocity.current.x *= 0.92;
        rotVelocity.current.y *= 0.92;
        crownRef.current.rotation.y += rotVelocity.current.y + 0.004;
        crownRef.current.rotation.x += rotVelocity.current.x;
        crownRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, crownRef.current.rotation.x));
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  // Swap material on tab change
  useEffect(() => {
    if (!sceneRef.current || !crownRef.current) return;
    const scene = sceneRef.current;
    scene.remove(crownRef.current);
    crownRef.current = buildCrown(scene, materials[activeTab]);
  }, [activeTab]);

  // Pointer events
  const onPointerDown = (e) => {
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e) => {
    if (!isDragging.current || !crownRef.current) return;
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;
    rotVelocity.current.y = dx * 0.012;
    rotVelocity.current.x = dy * 0.012;
    crownRef.current.rotation.y += dx * 0.012;
    crownRef.current.rotation.x += dy * 0.012;
    crownRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, crownRef.current.rotation.x));
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { isDragging.current = false; };

  const onWheel = (e) => {
    e.preventDefault();
    zoomRef.current = Math.max(2.5, Math.min(7, zoomRef.current + e.deltaY * 0.005));
    if (cameraRef.current) cameraRef.current.position.z = zoomRef.current;
  };

  const resetView = () => {
    if (crownRef.current) {
      crownRef.current.rotation.set(0, 0, 0);
      rotVelocity.current = { x: 0, y: 0 };
    }
    if (cameraRef.current) {
      zoomRef.current = 4.5;
      cameraRef.current.position.z = 4.5;
    }
  };

  const zoom = (dir) => {
    zoomRef.current = Math.max(2.5, Math.min(7, zoomRef.current + dir * 0.5));
    if (cameraRef.current) cameraRef.current.position.z = zoomRef.current;
  };

  return (
    <div className="relative border border-cyan/20 rounded-sm bg-card/30 overflow-hidden" style={{ height: 420 }}>
      {/* Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      />

      {/* HUD grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,229,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top-left label */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
        <span className="font-mono text-[10px] text-cyan/80 uppercase tracking-[0.2em]">Interactive 3D Model</span>
      </div>

      {/* Hint */}
      <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-1.5 bg-obsidian/70 backdrop-blur-sm border border-cyan/15 rounded-sm px-2.5 py-1">
        <Move className="w-3 h-3 text-cyan/60" />
        <span className="font-mono text-[9px] text-muted-foreground">Drag to rotate • Scroll to zoom</span>
      </div>

      {/* Material selector tabs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 bg-obsidian/80 backdrop-blur-sm border border-cyan/20 rounded-sm p-1">
        {Object.entries(materials).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
              activeTab === key
                ? 'bg-cyan text-obsidian font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute right-4 bottom-4 flex flex-col gap-1.5">
        <button
          onClick={() => zoom(-1)}
          className="w-8 h-8 flex items-center justify-center bg-obsidian/80 border border-cyan/20 rounded-sm text-cyan/70 hover:text-cyan hover:border-cyan/40 transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => zoom(1)}
          className="w-8 h-8 flex items-center justify-center bg-obsidian/80 border border-cyan/20 rounded-sm text-cyan/70 hover:text-cyan hover:border-cyan/40 transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={resetView}
          className="w-8 h-8 flex items-center justify-center bg-obsidian/80 border border-cyan/20 rounded-sm text-cyan/70 hover:text-cyan hover:border-cyan/40 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}