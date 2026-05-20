import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCcw, ZoomIn, ZoomOut, Move, Loader } from 'lucide-react';

const GLB_URL = 'https://raw.githubusercontent.com/bibaboba991james-art/434343434/4f4d7ea3fe7e5e923a39dc2c0dd2861bd1084285/2026-03-27_00001-002%20(1).glb';

const MATERIALS = {
  zirconia: { label: 'Цирконий', color: 0xf0f0f0, roughness: 0.15, metalness: 0.05 },
  metal:    { label: 'Металл',   color: 0xc8c8c8, roughness: 0.3,  metalness: 0.85 },
  ceramic:  { label: 'Керамика', color: 0xfaf5f0, roughness: 0.08, metalness: 0.0  },
};

function applyMaterial(group, matConfig) {
  const mat = new THREE.MeshStandardMaterial({
    color: matConfig.color,
    roughness: matConfig.roughness,
    metalness: matConfig.metalness,
  });
  group.traverse((child) => {
    if (child.isMesh) child.material = mat;
  });
}

export default function CrownViewer3D() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);
  const frameRef = useRef(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotVelocity = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(6.5);

  const [activeTab, setActiveTab] = useState('zirconia');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, zoomRef.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0x8ab4c8, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(3, 5, 4); key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x00e5ff, 0.6);
    fill.position.set(-4, 2, -2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.0);
    rim.position.set(0, -3, -5);
    scene.add(rim);

    // Load GLB
    const loader = new GLTFLoader();
    loader.load(
      GLB_URL,
      (gltf) => {
        const model = gltf.scene;

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.0 / maxDim;
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        
        // Set initial angle for better view
        model.rotation.x = 0.25;
        model.rotation.y = -0.35;

        applyMaterial(model, MATERIALS['zirconia']);
        scene.add(model);
        modelRef.current = model;
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error(err);
        setError('Не удалось загрузить модель');
        setLoading(false);
      }
    );

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isDragging.current && modelRef.current) {
        rotVelocity.current.x *= 0.88;
        rotVelocity.current.y *= 0.88;
        modelRef.current.rotation.y += rotVelocity.current.y;
        modelRef.current.rotation.x += rotVelocity.current.x;
        modelRef.current.rotation.x = Math.max(-Math.PI, Math.min(Math.PI, modelRef.current.rotation.x));
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

  // Material change
  useEffect(() => {
    if (modelRef.current) applyMaterial(modelRef.current, MATERIALS[activeTab]);
  }, [activeTab]);

  const onPointerDown = (e) => { isDragging.current = true; prevMouse.current = { x: e.clientX, y: e.clientY }; };
  const onPointerMove = (e) => {
    if (!isDragging.current || !modelRef.current) return;
    const dx = e.clientX - prevMouse.current.x, dy = e.clientY - prevMouse.current.y;
    rotVelocity.current.y = dx * 0.008;
    rotVelocity.current.x = dy * 0.008;
    modelRef.current.rotation.y += dx * 0.008;
    modelRef.current.rotation.x = Math.max(-Math.PI, Math.min(Math.PI, modelRef.current.rotation.x + dy * 0.008));
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { isDragging.current = false; };
  const onWheel = (e) => {
    e.preventDefault();
    zoomRef.current = Math.max(4, Math.min(10, zoomRef.current + e.deltaY * 0.005));
    if (cameraRef.current) cameraRef.current.position.z = zoomRef.current;
  };
  const resetView = () => {
    if (modelRef.current) { modelRef.current.rotation.set(0.25, -0.35, 0); rotVelocity.current = { x: 0, y: 0 }; }
    if (cameraRef.current) { zoomRef.current = 6.5; cameraRef.current.position.z = 6.5; }
  };
  const zoom = (dir) => {
    zoomRef.current = Math.max(4, Math.min(10, zoomRef.current + dir * 0.5));
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

      {/* Loading */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-6 h-6 text-cyan animate-spin" />
            <span className="font-mono text-xs text-cyan/70">Загрузка модели...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs text-destructive">{error}</span>
        </div>
      )}

      {/* HUD grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,229,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
        <span className="font-mono text-[10px] text-cyan/80 uppercase tracking-[0.2em]">Interactive 3D Model</span>
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
            onClick={() => setActiveTab(key)}
            className={`px-4 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-wider transition-all duration-200 ${
              activeTab === key ? 'bg-cyan text-obsidian font-semibold' : 'text-muted-foreground hover:text-foreground'
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