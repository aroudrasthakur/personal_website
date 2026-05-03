import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1 : 1.25),
    );
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particleCount = isMobile ? 180 : 360;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const accentColor = new THREE.Color("#00ff88");
    const secondaryColor = new THREE.Color("#8fdcff");
    const whiteColor = new THREE.Color("#f4f7fb");

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = (Math.random() - 0.5) * 60;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      velocities[i3] = (Math.random() - 0.5) * 0.006;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;

      const t = Math.random();
      const color =
        t < 0.16 ? accentColor : t < 0.45 ? secondaryColor : whiteColor;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 1.8 + 0.35;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

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
          gl_FragColor = vec4(vColor, alpha * 0.72);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Shooting stars (short-lived streak lines, additive glow)
    const SHOOT_STAR_SLOTS = prefersReduced ? 2 : 5;
    type ShootingSlot = {
      dead: boolean;
      nextSpawnIn: number;
      line: THREE.Line;
      positionAttr: THREE.BufferAttribute;
      head: THREE.Vector3;
      dir: THREE.Vector3;
      speed: number;
      trailLen: number;
      ttl: number;
      age: number;
    };

    const starHex = ["#eaf8ff", "#c8efff", "#ffffff"];

    function spawnShootingSlot(slot: ShootingSlot): void {
      slot.dead = false;
      slot.age = 0;
      slot.ttl = (prefersReduced ? 3.2 : 2.6) + Math.random() * 1.4;
      slot.dir
        .set(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          (Math.random() * 2 - 1) * 0.82,
        )
        .normalize();
      slot.speed = (prefersReduced ? 42 : 64) + Math.random() * 36;
      slot.trailLen = 6 + Math.random() * 10;
      const rStart = 3 + Math.random() * 14;
      slot.head.copy(slot.dir).multiplyScalar(rStart);
      const mat = slot.line.material as THREE.LineBasicMaterial;
      mat.color.set(
        starHex[Math.floor(Math.random() * starHex.length)] ?? "#eaf8ff",
      );
      slot.line.visible = true;
      mat.opacity = 0;
    }

    const shootingSlots: ShootingSlot[] = [];
    for (let si = 0; si < SHOOT_STAR_SLOTS; si++) {
      const shootGeom = new THREE.BufferGeometry();
      const positions = new Float32Array(6);
      shootGeom.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const shootMat = new THREE.LineBasicMaterial({
        color: starHex[0],
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const shootLine = new THREE.Line(shootGeom, shootMat);
      shootLine.frustumCulled = false;
      shootLine.visible = false;
      particles.add(shootLine);
      shootingSlots.push({
        dead: true,
        nextSpawnIn:
          si * (prefersReduced ? 9 : 1.35) +
          Math.random() * (prefersReduced ? 22 : 2.8),
        line: shootLine,
        positionAttr: shootGeom.getAttribute(
          "position",
        ) as THREE.BufferAttribute,
        head: new THREE.Vector3(),
        dir: new THREE.Vector3(),
        speed: 1,
        trailLen: 1,
        ttl: 1,
        age: 0,
      });
    }

    let lastPerf = performance.now();

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handleMouseMove, { passive: true });

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 1.25),
      );
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let time = 0;
    let isPageVisible = document.visibilityState === "visible";

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";
      if (isPageVisible) lastPerf = performance.now();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isPageVisible) return;

      const perfNow = performance.now();
      const dt = Math.min(0.056, Math.max(0, (perfNow - lastPerf) / 1000));
      lastPerf = perfNow;

      time += prefersReduced ? 0.002 : 0.008;
      material.uniforms.uTime.value = time;

      // Subtle mouse-driven rotation
      particles.rotation.y += (mouse.x * 0.012 - particles.rotation.y) * 0.018;
      particles.rotation.x += (mouse.y * 0.008 - particles.rotation.x) * 0.018;

      particles.rotation.z += 0.00015;

      for (const ss of shootingSlots) {
        if (ss.dead) {
          ss.nextSpawnIn -= dt;
          if (ss.nextSpawnIn <= 0) spawnShootingSlot(ss);
          continue;
        }

        ss.age += dt;
        ss.head.addScaledVector(ss.dir, ss.speed * dt);

        const arr = ss.positionAttr.array as Float32Array;
        arr[3] = ss.head.x;
        arr[4] = ss.head.y;
        arr[5] = ss.head.z;
        arr[0] = ss.head.x - ss.dir.x * ss.trailLen;
        arr[1] = ss.head.y - ss.dir.y * ss.trailLen;
        arr[2] = ss.head.z - ss.dir.z * ss.trailLen;
        ss.positionAttr.needsUpdate = true;

        const mat = ss.line.material as THREE.LineBasicMaterial;
        const p = ss.age / ss.ttl;
        const envelope = Math.sin(Math.PI * Math.min(1, Math.max(0, p)));
        mat.opacity = 0.78 * envelope * envelope;

        const pastShell = ss.head.lengthSq() > 52 * 52;
        if (ss.age >= ss.ttl || pastShell) {
          ss.dead = true;
          ss.line.visible = false;
          mat.opacity = 0;
          ss.nextSpawnIn =
            (prefersReduced ? 14 : 3.2) +
            Math.random() * (prefersReduced ? 28 : 8.5);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      for (const ss of shootingSlots) {
        ss.line.geometry.dispose();
        (ss.line.material as THREE.Material).dispose();
        particles.remove(ss.line);
      }
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
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
