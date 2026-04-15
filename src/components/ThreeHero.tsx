import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.25));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particleCount = isMobile ? 180 : 360;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const accentColor = new THREE.Color('#00ff88');
    const secondaryColor = new THREE.Color('#8fdcff');
    const whiteColor = new THREE.Color('#f4f7fb');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 60;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      velocities[i3] = (Math.random() - 0.5) * 0.006;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;

      const t = Math.random();
      const color = t < 0.16 ? accentColor : t < 0.45 ? secondaryColor : whiteColor;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 1.8 + 0.35;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material with custom shader for round points
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec3 pos = position;
          pos.y += sin(uTime * 0.3 + position.x * 0.05) * 0.5;
          pos.x += cos(uTime * 0.2 + position.y * 0.05) * 0.3;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * uPixelRatio * (20.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.42);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handleMouseMove, { passive: true });

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 1.25));
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let time = 0;
    let isPageVisible = document.visibilityState === 'visible';

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isPageVisible) return;

      time += prefersReduced ? 0.002 : 0.008;
      material.uniforms.uTime.value = time;

      // Subtle mouse-driven rotation
      particles.rotation.y += (mouse.x * 0.012 - particles.rotation.y) * 0.018;
      particles.rotation.x += (mouse.y * 0.008 - particles.rotation.x) * 0.018;

      particles.rotation.z += 0.00015;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
