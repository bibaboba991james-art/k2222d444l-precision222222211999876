import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';

export default function ProsthesisViewer3D() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const frameRef = useRef(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotVelocity = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(5.5);

  const [activeTab, setActiveTab] = useState('acrylic');

  const materials = {
    acrylic: { label: 'Акрил', color: 0xf5e8e0, roughness: 0.25, metalness: 0.0, gumColor: 0xe87070 },
    nylon:   { label: 'Нейлон', color: 0xfaf0ec, roughness: 0.15, metalness: 0.0, gumColor: 0xd96060 },
    metal:   { label: 'Металл', color: 0xc0c0c8, roughness: 0.35, metalness: 0.8, gumColor: 0xe87070 },
  };

  const buildProsthesis = (scene, matConfig) => {
    const group = new THREE.Group();

    const toothMat = new THREE.MeshStandardMaterial({
      color: matConfig.color,
      roughness: matConfig.roughness,
      metalness: matConfig.metalness,
    });
    const gumMat = new THREE.MeshStandardMaterial({
      color: matConfig.gumColor,
      roughness: 0.6,
      metalness: 0.0,
    });
    const baseMat = new THREE.MeshStandardMaterial({
      color: matConfig.gumColor,
      roughness: 0.5,
      metalness: 0.05,
    });

    // --- Horseshoe base (gum plate) ---
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.0, 0, 0.2),
      new THREE.Vector3(-1.8, 0, -0.6),
      new THREE.Vector3(-0.9, 0, -1.1),
      new THREE.Vector3(0, 0, -1.3),
      new THREE.Vector3(0.9, 0, -1.1),
      new THREE.Vector3(1.8, 0, -0.6),
      new THREE.Vector3(2.0, 0, 0.2),
    ]);
    const tubeGeo = new THREE.TubeGeometry(curve, 60, 0.32, 12, false);
    const base = new THREE.Mesh(tubeGeo, baseMat);
    base.position.y = -0.5;
    group.add(base);

    // --- Teeth along the arch ---
    const teethPositions = [
      { x: -1.75, z: -0.15, ry: 0.35, w: 0.38, h: 0.55 },
      { x: -1.35, z: -0.55, ry: 0.2,  w: 0.36, h: 0.60 },
      { x: -0.9,  z: -0.88, ry: 0.08, w: 0.36, h: 0.65 },
      { x: -0.45, z: -1.05, ry: 0.0,  w: 0.34, h: 0.68 },
      { x: 0,     z: -1.1,  ry: 0.0,  w: 0.34, h: 0.70 },
      { x: 0.45,  z: -1.05, ry: 0.0,  w: 0.34, h: 0.68 },
      { x: 0.9,   z: -0.88, ry: -0.08,w: 0.36, h: 0.65 },
      { x: 1.35,  z: -0.55, ry: -0.2, w: 0.36, h: 0.60 },
      { x: 1.75,  z: -0.15, ry: -0.35,w: 0.38, h: 0.55 },
    ];

    teethPositions.forEach((t) => {
      // Tooth body
      const geo = new THREE.BoxGeometry(t.w, t.h, 0.28);
      // Round the tooth slightly
      const mesh = new THREE.Mesh(geo, toothMat);
      mesh.position.set(t.x, -0.05, t.z);
      mesh.rotation.y = t.ry;
      group.add(mesh);

      // Cusp bump on top
      const cuspGeo = new THREE.SphereGeometry(t.w * 0.28, 12, 10);
      const cusp = new THREE.Mesh(cuspGeo, toothMat);
      cusp.position.set(t.x, -0.05 + t.h * 0.5 + 0.04, t.z);
      cusp.rotation.y = t.ry;
      cusp.scale.set(1, 0.55, 0.85);
      group.add(cusp);

      // Gum collar at base of each tooth
      const gumGeo = new THREE.CylinderGeometry(t.w * 0.55, t.w * 0.6, 0.12, 14);
      const gum = new THREE.Mesh(gumGeo, gumMat);
      gum.position.set(t.x, -0.05 - t.h * 0.5 + 0.04, t.z);
      gum.rotation.y = t.ry;
      gum.scale.set(1, 1, 0.7);
      group.add(gum);
    });

    group.position.y = 0.3;
    group.rotation.x = 0.15;
    scene.add(group);
    return group;
  };

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = el.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 1.0, zoomRef.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0x8ab4c8, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(3, 5, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x00e5ff, 0.5);
    fill.position.set(-4, 2, -2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(0, -3, -5);
    scene.add(rim);

    modelRef.current = buildProsthesis(scene, materials[activeTab]);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isDragging.current && modelRef.current) {
        rotVelocity.current.x *= 0.92;
        rotVelocity.current.y *= 0.92;
        modelRef.current.rotation.y += rotVelocity.current.y + 0.003;
        modelRef.current.rotation.x += rotVelocity.current.x;
        modelRef.current.rotation.x = Math.max(-0.5, Math.min(0.5, modelRef.current.rotation.x));
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
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

  useEffect(() => {
    if (!sceneRef.current || !modelRef.current) return;
    sceneRef.current.remove(modelRef.current);
    modelRef.current = buildProsthesis(sceneRef.current, materials[activeTab]);
  }, [activeTab]);

  const onPointerDown = (e) => { isDragging.current = true; prevMouse.current = { x: e.clientX, y: e.clientY }; };
  const onPointerMove = (e) => {
    if (!isDragging.current || !modelRef.current) return;
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;
    rotVelocity.current.y = dx * 0.012;
    rotVelocity.current.x = dy * 0.012;
    modelRef.current.rotation.y += dx * 0.012;
    modelRef.current.rotation.x += dy * 0.012;
    modelRef.current.rotation.x = Math.max(-0.5, Math.min(0.5, modelRef.current.rotation.x));
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { isDragging.current = false; };
  const onWheel = (e) => {
    e.preventDefault();
    zoomRef.current = Math.max(3, Math.min(8, zoomRef.current + e.deltaY * 0.005));
    if (cameraRef.current) cameraRef.current.position.z = zoomRef.current;
  };
  const resetView = () => {
    if (modelRef.current) { modelRef.current.rotation.set(0.15, 0, 0); rotVelocity.current = { x: 0, y: 0 }; }
    if (cameraRef.current) { zoomRef.current = 5.5; cameraRef.current.position.z = 5.5; }
  };
  const zoom = (dir) => {
    zoomRef.current = Math.max(3, Math.min(8, zoomRef.current + dir * 0.5));
    if (cameraRef.current) cameraRef.current.position.z = zoomRef.current;
  };

  return (
    <div className="relative border border-cyan/20 rounded-sm bg-card/30 overflow-hidden" style={{ height: 420 }}>
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      />

      {/* HUD grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,229,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
        <span className="font-mono text-[10px] text-cyan/80 uppercase tracking-[0.2em]">Съёмный протез 3D</span>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-1.5 bg-obsidian/70 backdrop-blur-sm border border-cyan/15 rounded-sm px-2.5 py-1">
        <Move className="w-3 h-3 text-cyan/60" />
        <span className="font-mono text-[9px] text-muted-foreground">Drag to rotate • Scroll to zoom</span>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 bg-obsidian/80 backdrop-blur-sm border border-cyan/20 rounded-sm p-1">
        {Object.entries(materials).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
              activeTab === key ? 'bg-cyan text-obsidian font-semibold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="absolute right-4 bottom-4 flex flex-col gap-1.5">
        <button onClick={() => zoom(-1)} className="w-8 h-8 flex items-center justify-center bg-obsidian/80 border border-cyan/20 rounded-sm text-cyan/70 hover:text-cyan hover:border-cyan/40 transition-colors">
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => zoom(1)} className="w-8 h-8 flex items-center justify-center bg-obsidian/80 border border-cyan/20 rounded-sm text-cyan/70 hover:text-cyan hover:border-cyan/40 transition-colors">
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button onClick={resetView} className="w-8 h-8 flex items-center justify-center bg-obsidian/80 border border-cyan/20 rounded-sm text-cyan/70 hover:text-cyan hover:border-cyan/40 transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}