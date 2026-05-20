import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { RotateCcw, ZoomIn, ZoomOut, Move, Loader2 } from 'lucide-react';

// Thingiverse CDN proxy via allorigins to bypass CORS
const proxy = (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

const STL_FILES = [
  {
    url: 'https://cdn.thingiverse.com/assets/9a/cc/18/6f/fd/Maxillary_Denture_Base.stl',
    color: 0xe07070,
    roughness: 0.55,
    metalness: 0.0,
    label: 'base',
  },
  {
    url: 'https://cdn.thingiverse.com/assets/14/33/7c/9e/a3/Anterior_Teeth.stl',
    color: 0xf5f0e8,
    roughness: 0.2,
    metalness: 0.0,
    label: 'anterior',
  },
  {
    url: 'https://cdn.thingiverse.com/assets/f6/d4/a4/5e/d1/Posterior_Teeth_1.stl',
    color: 0xf5f0e8,
    roughness: 0.2,
    metalness: 0.0,
    label: 'posterior1',
  },
  {
    url: 'https://cdn.thingiverse.com/assets/8c/7a/6b/3e/9f/Posterior_Teeth_2.stl',
    color: 0xf5f0e8,
    roughness: 0.2,
    metalness: 0.0,
    label: 'posterior2',
  },
];

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
  const zoomRef = useRef(120);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = el.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 2000);
    camera.position.set(0, 20, zoomRef.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(50, 100, 80);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x00e5ff, 0.5);
    fill.position.set(-80, 40, -40);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(0, -60, -100);
    scene.add(rim);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    const loader = new STLLoader();
    let loaded = 0;
    let errored = false;

    const tryLoad = (fileInfo) => {
      return new Promise((resolve) => {
        // Try direct URL first, then proxy
        const tryUrl = (url, useProxy) => {
          loader.load(
            useProxy ? proxy(url) : url,
            (geometry) => {
              geometry.computeVertexNormals();
              const mat = new THREE.MeshStandardMaterial({
                color: fileInfo.color,
                roughness: fileInfo.roughness,
                metalness: fileInfo.metalness,
              });
              const mesh = new THREE.Mesh(geometry, mat);
              group.add(mesh);
              loaded++;
              setLoadedCount(loaded);
              resolve(true);
            },
            undefined,
            () => {
              if (!useProxy) {
                tryUrl(url, true);
              } else {
                resolve(false);
              }
            }
          );
        };
        tryUrl(fileInfo.url, false);
      });
    };

    Promise.all(STL_FILES.map(tryLoad)).then((results) => {
      const anyLoaded = results.some(Boolean);
      if (!anyLoaded) {
        setLoadError(true);
        setLoading(false);
        return;
      }

      // Center and scale the group
      const box = new THREE.Box3().setFromObject(group);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 80 / maxDim;

      group.scale.setScalar(scale);
      group.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      group.rotation.x = 0.3;

      setLoading(false);
    });

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isDragging.current && groupRef.current) {
        rotVelocity.current.x *= 0.92;
        rotVelocity.current.y *= 0.92;
        groupRef.current.rotation.y += rotVelocity.current.y + 0.003;
        groupRef.current.rotation.x += rotVelocity.current.x;
        groupRef.current.rotation.x = Math.max(-0.6, Math.min(0.8, groupRef.current.rotation.x));
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

  const onPointerDown = (e) => { isDragging.current = true; prevMouse.current = { x: e.clientX, y: e.clientY }; };
  const onPointerMove = (e) => {
    if (!isDragging.current || !groupRef.current) return;
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;
    rotVelocity.current.y = dx * 0.012;
    rotVelocity.current.x = dy * 0.012;
    groupRef.current.rotation.y += dx * 0.012;
    groupRef.current.rotation.x += dy * 0.012;
    groupRef.current.rotation.x = Math.max(-0.6, Math.min(0.8, groupRef.current.rotation.x));
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { isDragging.current = false; };
  const onWheel = (e) => {
    e.preventDefault();
    zoomRef.current = Math.max(40, Math.min(250, zoomRef.current + e.deltaY * 0.2));
    if (cameraRef.current) cameraRef.current.position.z = zoomRef.current;
  };
  const resetView = () => {
    if (groupRef.current) { groupRef.current.rotation.set(0.3, 0, 0); rotVelocity.current = { x: 0, y: 0 }; }
    if (cameraRef.current) { zoomRef.current = 120; cameraRef.current.position.z = 120; }
  };
  const zoom = (dir) => {
    zoomRef.current = Math.max(40, Math.min(250, zoomRef.current + dir * 20));
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

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm gap-3">
          <Loader2 className="w-8 h-8 text-cyan animate-spin" />
          <span className="font-mono text-xs text-cyan/80 uppercase tracking-wider">
            Загрузка модели... {loadedCount}/{STL_FILES.length}
          </span>
        </div>
      )}

      {/* Error fallback */}
      {loadError && !loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">Не удалось загрузить модель</span>
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
        <span className="font-mono text-[10px] text-cyan/80 uppercase tracking-[0.2em]">Съёмный протез 3D</span>
      </div>

      {!loading && (
        <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-1.5 bg-obsidian/70 backdrop-blur-sm border border-cyan/15 rounded-sm px-2.5 py-1">
          <Move className="w-3 h-3 text-cyan/60" />
          <span className="font-mono text-[9px] text-muted-foreground">Drag to rotate • Scroll to zoom</span>
        </div>
      )}

      {!loading && (
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
      )}
    </div>
  );
}