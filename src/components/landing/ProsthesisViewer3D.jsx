import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';

const MATERIALS = {
  acrylic: { label: 'Акрил', baseColor: 0xd46060, teethColor: 0xfaf5ee, roughness: 0.5, metalness: 0.0 },
  nylon:   { label: 'Нейлон', baseColor: 0xc97878, teethColor: 0xfcf8f2, roughness: 0.35, metalness: 0.0 },
  metal:   { label: 'Металл', baseColor: 0xa0a0b0, teethColor: 0xf5f0e8, roughness: 0.3, metalness: 0.7 },
};

function buildDenture(scene, matConfig) {
  const group = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({
    color: matConfig.baseColor, roughness: matConfig.roughness, metalness: matConfig.metalness,
  });
  const teethMat = new THREE.MeshStandardMaterial({
    color: matConfig.teethColor, roughness: 0.15, metalness: 0.0,
  });
  const gingivaMat = new THREE.MeshStandardMaterial({
    color: matConfig.baseColor, roughness: 0.6, metalness: 0.0,
  });

  // === DENTURE BASE (horseshoe palate shape) ===
  // Main arch shape using a curved tube path
  const archShape = new THREE.Shape();
  // Horseshoe arch - upper denture viewed from below
  archShape.moveTo(-2.8, 0);
  archShape.bezierCurveTo(-2.8, -2.2, -1.8, -3.4, 0, -3.4);
  archShape.bezierCurveTo(1.8, -3.4, 2.8, -2.2, 2.8, 0);
  archShape.lineTo(2.2, 0);
  archShape.bezierCurveTo(2.2, -1.8, 1.5, -2.8, 0, -2.8);
  archShape.bezierCurveTo(-1.5, -2.8, -2.2, -1.8, -2.2, 0);
  archShape.lineTo(-2.8, 0);

  const extrudeSettings = { depth: 0.6, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 4 };
  const baseGeo = new THREE.ExtrudeGeometry(archShape, extrudeSettings);
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.set(0, -0.3, 0);
  baseMesh.rotation.x = Math.PI / 2;
  group.add(baseMesh);

  // Palate plate (fills center of horseshoe)
  const palateShape = new THREE.Shape();
  palateShape.moveTo(-2.2, 0);
  palateShape.bezierCurveTo(-2.2, -1.8, -1.5, -2.8, 0, -2.8);
  palateShape.bezierCurveTo(1.5, -2.8, 2.2, -1.8, 2.2, 0);
  palateShape.lineTo(-2.2, 0);
  const palateGeo = new THREE.ExtrudeGeometry(palateShape, { depth: 0.25, bevelEnabled: false });
  const palateMesh = new THREE.Mesh(palateGeo, baseMat);
  palateMesh.position.set(0, -0.3, 0.08);
  palateMesh.rotation.x = Math.PI / 2;
  group.add(palateMesh);

  // === TEETH (14 teeth along the arch) ===
  const teethData = [
    // [angle_deg, x, z, width, height, isIncisor]
    // Front teeth (incisors & canines)
    { a:  90, x:  0.0,  z: -3.1, w: 0.52, h: 0.9,  incisor: true  },
    { a:  90, x:  0.6,  z: -3.0, w: 0.50, h: 0.85, incisor: true  },
    { a:  90, x: -0.6,  z: -3.0, w: 0.50, h: 0.85, incisor: true  },
    { a:  90, x:  1.15, z: -2.85, w: 0.50, h: 0.9,  incisor: true  },
    { a:  90, x: -1.15, z: -2.85, w: 0.50, h: 0.9,  incisor: true  },
    // Canines
    { a:  75, x:  1.7,  z: -2.5, w: 0.50, h: 1.0,  incisor: false },
    { a: 105, x: -1.7,  z: -2.5, w: 0.50, h: 1.0,  incisor: false },
    // Premolars
    { a:  60, x:  2.2,  z: -1.9, w: 0.55, h: 0.85, incisor: false },
    { a: 120, x: -2.2,  z: -1.9, w: 0.55, h: 0.85, incisor: false },
    { a:  50, x:  2.55, z: -1.1, w: 0.58, h: 0.82, incisor: false },
    { a: 130, x: -2.55, z: -1.1, w: 0.58, h: 0.82, incisor: false },
    // Molars
    { a:  40, x:  2.75, z: -0.2, w: 0.65, h: 0.78, incisor: false },
    { a: 140, x: -2.75, z: -0.2, w: 0.65, h: 0.78, incisor: false },
  ];

  teethData.forEach((t) => {
    const angleRad = THREE.MathUtils.degToRad(t.a);
    // Tooth body
    const toothGeo = new THREE.CylinderGeometry(t.w * 0.42, t.w * 0.38, t.h, 12, 1);
    const toothMesh = new THREE.Mesh(toothGeo, teethMat);
    toothMesh.position.set(t.x, t.h / 2 + 0.28, t.z);
    toothMesh.rotation.y = Math.PI / 2 - angleRad;
    group.add(toothMesh);

    // Tooth top cap (occlusal surface - rounded)
    const capGeo = new THREE.SphereGeometry(t.w * 0.42, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const capMesh = new THREE.Mesh(capGeo, teethMat);
    capMesh.position.set(t.x, t.h + 0.28, t.z);
    capMesh.rotation.y = Math.PI / 2 - angleRad;
    group.add(capMesh);

    // Gingiva ridge around each tooth
    const gumGeo = new THREE.CylinderGeometry(t.w * 0.52, t.w * 0.48, 0.15, 12, 1);
    const gumMesh = new THREE.Mesh(gumGeo, gingivaMat);
    gumMesh.position.set(t.x, 0.35, t.z);
    group.add(gumMesh);
  });

  // Center and add to scene
  group.position.set(0, 0, 0);
  group.rotation.x = 0.4;
  scene.add(group);
  return group;
}

export default function ProsthesisViewer3D() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const groupRef = useRef(null);
  const frameRef = useRef(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotVelocity = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(9);

  const [activeMat, setActiveMat] = useState('acrylic');

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 200);
    camera.position.set(0, 1.5, zoomRef.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(4, 8, 6);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x00e5ff, 0.5);
    fill.position.set(-6, 2, -4);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffd0a0, 0.6);
    rim.position.set(0, -5, -8);
    scene.add(rim);

    groupRef.current = buildDenture(scene, MATERIALS[activeMat]);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isDragging.current && groupRef.current) {
        rotVelocity.current.x *= 0.92;
        rotVelocity.current.y *= 0.92;
        groupRef.current.rotation.y += rotVelocity.current.y + 0.004;
        groupRef.current.rotation.x += rotVelocity.current.x;
        groupRef.current.rotation.x = Math.max(-0.3, Math.min(1.0, groupRef.current.rotation.x));
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  // Swap materials on tab change
  useEffect(() => {
    if (!sceneRef.current || !groupRef.current) return;
    sceneRef.current.remove(groupRef.current);
    groupRef.current = buildDenture(sceneRef.current, MATERIALS[activeMat]);
  }, [activeMat]);

  const onPointerDown = (e) => { isDragging.current = true; prevMouse.current = { x: e.clientX, y: e.clientY }; };
  const onPointerMove = (e) => {
    if (!isDragging.current || !groupRef.current) return;
    const dx = e.clientX - prevMouse.current.x, dy = e.clientY - prevMouse.current.y;
    rotVelocity.current.y = dx * 0.012;
    rotVelocity.current.x = dy * 0.012;
    groupRef.current.rotation.y += dx * 0.012;
    groupRef.current.rotation.x = Math.max(-0.3, Math.min(1.0, groupRef.current.rotation.x + dy * 0.012));
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { isDragging.current = false; };
  const onWheel = (e) => {
    e.preventDefault();
    zoomRef.current = Math.max(4, Math.min(18, zoomRef.current + e.deltaY * 0.01));
    if (cameraRef.current) cameraRef.current.position.z = zoomRef.current;
  };
  const resetView = () => {
    if (groupRef.current) { groupRef.current.rotation.set(0.4, 0, 0); rotVelocity.current = { x: 0, y: 0 }; }
    if (cameraRef.current) { zoomRef.current = 9; cameraRef.current.position.z = 9; }
  };
  const zoom = (dir) => {
    zoomRef.current = Math.max(4, Math.min(18, zoomRef.current + dir * 1.2));
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

      {/* Material tabs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 bg-obsidian/80 backdrop-blur-sm border border-cyan/20 rounded-sm p-1">
        {Object.entries(MATERIALS).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setActiveMat(key)}
            className={`px-4 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
              activeMat === key ? 'bg-cyan text-obsidian font-semibold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Zoom controls */}
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