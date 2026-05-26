import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";
import * as THREE from "three";

function GlassBottle() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.28;
    }
  });

  const points = useMemo<THREE.Vector2[]>(() => [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.22, 0.00),
    new THREE.Vector2(0.25, 0.04),
    new THREE.Vector2(0.28, 0.22),
    new THREE.Vector2(0.30, 0.52),
    new THREE.Vector2(0.30, 0.88),
    new THREE.Vector2(0.27, 1.05),
    new THREE.Vector2(0.16, 1.26),
    new THREE.Vector2(0.10, 1.38),
    new THREE.Vector2(0.10, 1.66),
    new THREE.Vector2(0.12, 1.72),
    new THREE.Vector2(0.13, 1.76),
    new THREE.Vector2(0.10, 1.80),
  ], []);

  return (
    <Float speed={1.4} floatIntensity={0.28} rotationIntensity={0.04}>
      <group ref={groupRef} scale={1.5} position={[0, -1.35, 0]}>
        <mesh castShadow>
          <latheGeometry args={[points, 80]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.45}
            transmission={0.96}
            roughness={0.0}
            ior={1.5}
            chromaticAberration={0.04}
            color="#e8f2ff"
            attenuationColor="#c8dcff"
            attenuationDistance={2.0}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroBottle3D() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const isDesktop =
    typeof window !== "undefined" ? window.innerWidth >= 768 : true;

  const bottleX = useTransform(
    scrollYProgress,
    [0, 0.65],
    isDesktop ? ["0%", "20%"] : ["0%", "0%"]
  );
  const bottleScale = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, isDesktop ? 1.15 : 1.05]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.55],
    isDesktop ? [0, 1] : [1, 1]
  );
  const textY = useTransform(
    scrollYProgress,
    [0.22, 0.55],
    isDesktop ? [40, 0] : [0, 0]
  );

  return (
    <div ref={wrapperRef} style={{ height: "220dvh", overflow: "clip" }}>
      <div
        className="w-full bg-background"
        style={{ position: "sticky", top: 0, height: "100dvh", overflow: "hidden" }}
      >
        {/* 3D canvas */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ x: bottleX, scale: bottleScale, willChange: "transform" }}
        >
          <div style={{ width: "min(100vw, 600px)", height: "100dvh" }}>
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 40 }}
              gl={{
                alpha: true,
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.3,
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 6, 4]} intensity={1.8} color="#ffffff" />
              <pointLight position={[-3, 3, 3]} intensity={3.0} color="#ff9900" />
              <pointLight position={[3, -2, 2]} intensity={0.5} color="#6699ff" />
              <spotLight
                position={[0, 8, 2]}
                angle={0.25}
                penumbra={1}
                intensity={4}
                color="#ffffff"
              />
              <Environment preset="city" />
              <Suspense fallback={null}>
                <GlassBottle />
              </Suspense>
            </Canvas>
          </div>
        </motion.div>

        {/* Text overlay */}
        <motion.div
          className="absolute inset-0 flex items-end pb-[8dvh] md:pb-0 md:items-center pointer-events-none overflow-hidden"
          style={{ opacity: textOpacity }}
        >
          <div className="pointer-events-auto w-full px-6 md:w-auto md:ml-[8vw] lg:ml-[10vw]">
            <motion.div
              style={{ y: textY }}
              className="max-w-lg text-center md:text-left mx-auto md:mx-0"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-1">
                <Circle className="h-2 w-2 fill-primary text-primary" />
                <span className="text-sm font-body font-semibold uppercase tracking-widest text-primary">
                  Creative Lab
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px] font-extrabold leading-[1.08] tracking-tight text-foreground lowercase">
                from idea to shelf,{" "}
                <br className="hidden md:block" />
                and <span className="text-primary">everything</span> in between.
              </h1>

              <p className="mt-4 max-w-sm text-sm sm:text-base text-muted-foreground font-body mx-auto md:mx-0">
                branding, packaging, and storytelling built together, from a single source.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Button size="lg" asChild>
                  <Link to="/contact#form">start your brand</Link>
                </Button>
                <Button size="lg" variant="outline-white" asChild>
                  <Link to="/packaging">explore packaging</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
