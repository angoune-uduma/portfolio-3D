import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture, Html, Line } from "@react-three/drei";
import * as THREE from "three";

/* =========================
   AUDIO: Play/Pause + Volume
========================= */
function useIntroAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    const a = new Audio("/intro.mp3");
    a.loop = true;
    a.volume = volume;
    audioRef.current = a;
    return () => a.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unlock = () => {
      setAudioReady(true);
      window.removeEventListener("pointerdown", unlock);
    };
    window.addEventListener("pointerdown", unlock);
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  const play = async () => {
    const a = audioRef.current;
    if (!a || !audioReady) return;
    await a.play();
    setIsPlaying(true);
  };

  const pause = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    setIsPlaying(false);
  };

  const toggle = async () => {
    if (isPlaying) pause();
    else await play();
  };

  const setVol = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = v;
    setVolume(v);
  };

  return { audioReady, isPlaying, volume, toggle, setVol };
}

/* =========================
   Loader
========================= */
function Loader() {
  return (
    <Html center>
      <div
        style={{
          padding: "10px 14px",
          borderRadius: 12,
          background: "rgba(0,0,0,0.6)",
          color: "white",
          fontSize: 14,
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        Chargement…
      </div>
    </Html>
  );
}

/* =========================
   GEO: villes + route
========================= */
const CITY: Record<string, { lat: number; lon: number }> = {
  Lome: { lat: 6.1319, lon: 1.2228 },
  Libreville: { lat: 0.4162, lon: 9.4673 },
  Abuja: { lat: 9.0765, lon: 7.3986 },
  Lagos: { lat: 6.5244, lon: 3.3792 },
  Abidjan: { lat: 5.3599, lon: -4.0083 },
  Pretoria: { lat: -25.7479, lon: 28.2293 },
  Cotonou: { lat: 6.3703, lon: 2.3912 },
  Accra: { lat: 5.6037, lon: -0.187 },
  Paris: { lat: 48.8566, lon: 2.3522 },
  Lille: { lat: 50.6292, lon: 3.0573 },
  Nice: { lat: 43.7102, lon: 7.262 },
  Marseille: { lat: 43.2965, lon: 5.3698 },
  Istanbul: { lat: 41.0082, lon: 28.9784 },
  Montreal: { lat: 45.5017, lon: -73.5673 },
  Stuttgart: { lat: 48.7758, lon: 9.1829 },
  Bruxelles: { lat: 50.8503, lon: 4.3517 },
  "Rio de Janeiro": { lat: -22.9068, lon: -43.1729 },
  Moscow: { lat: 55.7558, lon: 37.6173 },
  "New York": { lat: 40.7128, lon: -74.006 },
  Dubai: { lat: 25.2048, lon: 55.2708 },
};

const ROUTE = [
  "Lome",
  "Libreville",
  "Abuja",
  "Lagos",
  "Abidjan",
  "Pretoria",
  "Cotonou",
  "Accra",
  "Paris",
  "Lille",
  "Nice",
  "Marseille",
  "Istanbul",
  "Montreal",
  "Stuttgart",
  "Bruxelles",
  "New York",
  "Rio de Janeiro",
  "Dubai",
  "Moscow",
];

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function buildArcCurve(a: THREE.Vector3, b: THREE.Vector3, lift = 0.3) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const up = mid.clone().normalize().multiplyScalar(mid.length() * (1 + lift));
  return new THREE.CatmullRomCurve3([a, up, b]);
}

/* =========================
   Camera smooth controller
========================= */
type FocusTarget = {
  camPos: THREE.Vector3;
  lookAt: THREE.Vector3;
} | null;

function CameraRig({
  target,
  controlsRef,
}: {
  target: FocusTarget;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  const current = useRef<FocusTarget>(null);

  useEffect(() => {
    if (target) current.current = target;
  }, [target]);

  useFrame((_, delta) => {
    const t = current.current;
    if (!t) return;

    camera.position.lerp(t.camPos, 1 - Math.pow(0.001, delta));

    const controls = controlsRef.current;
    if (controls) {
      controls.target.lerp(t.lookAt, 1 - Math.pow(0.001, delta));
      controls.update();
    }

    const posClose = camera.position.distanceTo(t.camPos) < 0.01;
    const tgtClose = controls && controls.target.distanceTo(t.lookAt) < 0.01;

    if (posClose && tgtClose) current.current = null;
  });

  return null;
}

/* =========================
   Halo pulsant Afrique
========================= */
function AfricaHalo({ radius }: { radius: number }) {
  const center = useMemo(() => latLonToVec3(5, 20, radius * 1.02), [radius]);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 2.2) * 0.06;
    ringRef.current.scale.setScalar(s);

    const mat = ringRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.18 + (Math.sin(t * 2.2) * 0.04 + 0.04);
  });

  const quat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), center.clone().normalize());
    return q;
  }, [center]);

  return (
    <mesh ref={ringRef} position={center} quaternion={quat}>
      <ringGeometry args={[0.08, 0.13, 64]} />
      <meshBasicMaterial
        color="#4aa3ff"
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* =========================
   Routes WOW++ + pins interactifs
========================= */
function RoutesWow({
  radius,
  onHoverCity,
  onClickCity,
}: {
  radius: number;
  onHoverCity: (name: string | null, pos?: THREE.Vector3) => void;
  onClickCity: (name: string, pos: THREE.Vector3) => void;
}) {
  const dashMats = useRef<any[]>([]);
  const dots = useRef<THREE.Mesh[][]>([]);
  const pinsRef = useRef<THREE.Mesh[]>([]);

  const data = useMemo(() => {
    const arcs: {
      key: string;
      curve: THREE.CatmullRomCurve3;
      points: THREE.Vector3[];
      phase: number;
    }[] = [];

    for (let i = 0; i < ROUTE.length - 1; i++) {
      const A = CITY[ROUTE[i]];
      const B = CITY[ROUTE[i + 1]];
      if (!A || !B) continue;

      const a = latLonToVec3(A.lat, A.lon, radius * 1.01);
      const b = latLonToVec3(B.lat, B.lon, radius * 1.01);
      const curve = buildArcCurve(a, b, 0.32);
      const points = curve.getPoints(170);

      arcs.push({
        key: `${ROUTE[i]}-${ROUTE[i + 1]}`,
        curve,
        points,
        phase: i * 0.055,
      });
    }

    const pins = Array.from(new Set(ROUTE))
      .map((name) => {
        const c = CITY[name];
        if (!c) return null;
        return { name, pos: latLonToVec3(c.lat, c.lon, radius * 1.012) };
      })
      .filter(Boolean) as { name: string; pos: THREE.Vector3 }[];

    return { arcs, pins };
  }, [radius]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    for (let i = 0; i < dashMats.current.length; i++) {
      const m = dashMats.current[i];
      if (m && typeof m.dashOffset === "number") m.dashOffset -= delta * 0.42;
    }

    for (let i = 0; i < data.arcs.length; i++) {
      const trail = dots.current[i];
      if (!trail) continue;

      const { curve, phase } = data.arcs[i];
      const base = (t * 0.09 + phase) % 1;
      const offsets = [0, 0.018, 0.036];

      for (let k = 0; k < offsets.length; k++) {
        const mesh = trail[k];
        if (!mesh) continue;

        const u = (base - offsets[k] + 1) % 1;
        mesh.position.copy(curve.getPointAt(u));

        const head = 0.010;
        const s = head - k * 0.0025 + Math.sin(t * 6 + i) * 0.001;
        mesh.scale.setScalar(Math.max(0.003, s));

        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = k === 0 ? 0.95 : k === 1 ? 0.55 : 0.25;
      }
    }

    for (let i = 0; i < data.pins.length; i++) {
      const pin = pinsRef.current[i];
      if (!pin) continue;
      const s = 0.008 + Math.sin(t * 2.8 + i) * 0.0016;
      pin.scale.setScalar(s);
    }
  });

  return (
    <group>
      {data.arcs.map((a, idx) => (
        <group key={a.key}>
          <Line
            points={a.points}
            color="#4aa3ff"
            transparent
            opacity={0.12}
            lineWidth={3.8}
          />
          <Line
            points={a.points}
            color="#4aa3ff"
            transparent
            opacity={0.45}
            lineWidth={1.2}
            dashed
            dashSize={0.055}
            gapSize={0.05}
            onUpdate={(line) => {
              // @ts-ignore
              dashMats.current[idx] = line.material;
            }}
          />
        </group>
      ))}

      {/* Comètes */}
      {data.arcs.map((a, idx) => (
        <group key={`dots-${a.key}`}>
          {[0, 1, 2].map((k) => (
            <mesh
              key={`${a.key}-dot-${k}`}
              ref={(el) => {
                if (!el) return;
                if (!dots.current[idx]) dots.current[idx] = [];
                dots.current[idx][k] = el;
              }}
            >
              <sphereGeometry args={[1, 14, 14]} />
              <meshBasicMaterial
                color="#4aa3ff"
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Pins interactifs */}
      {data.pins.map((p, idx) => (
        <mesh
          key={`pin-${p.name}`}
          position={p.pos}
          ref={(el) => {
            if (el) pinsRef.current[idx] = el;
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHoverCity(p.name, p.pos);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            onHoverCity(null);
            document.body.style.cursor = "default";
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClickCity(p.name, p.pos);
          }}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================
   Terre + routes + halo
========================= */
function EarthGroup({
  onHoverCity,
  onClickCity,
}: {
  onHoverCity: (name: string | null, pos?: THREE.Vector3) => void;
  onClickCity: (name: string, pos: THREE.Vector3) => void;
}) {
  const group = useRef<THREE.Group>(null!);

  const [map, normal, spec, clouds] = useTexture([
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
  ]);

  const earthMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map,
        normalMap: normal,
        normalScale: new THREE.Vector2(0.35, 0.35),
        roughness: 1,
        metalness: 0,
        emissive: new THREE.Color("#111111"),
        emissiveMap: spec,
        emissiveIntensity: 0.08,
      }),
    [map, normal, spec]
  );

  const cloudsMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: clouds,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      }),
    [clouds]
  );

  const radius = 1.25;
  const initialRotation = useMemo(() => new THREE.Euler(0.18, 1.85, 0), []);

  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.12;
    const t = performance.now() * 0.001;
    group.current.rotation.x = initialRotation.x + Math.sin(t * 0.35) * 0.03;
    group.current.rotation.z = Math.sin(t * 0.25) * 0.02;
  });

  return (
    <group ref={group} rotation={initialRotation}>
      <mesh>
        <sphereGeometry args={[radius, 96, 96]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>

      <mesh>
        <sphereGeometry args={[radius * 1.012, 96, 96]} />
        <primitive object={cloudsMaterial} attach="material" />
      </mesh>

      <mesh>
        <sphereGeometry args={[radius * 1.065, 64, 64]} />
        <meshBasicMaterial
          color="#4aa3ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      <AfricaHalo radius={radius} />

      <RoutesWow radius={radius} onHoverCity={onHoverCity} onClickCity={onClickCity} />
    </group>
  );
}

/* =========================
   Page
========================= */
export default function EarthAfricaPage() {
  const { audioReady, isPlaying, volume, toggle, setVol } = useIntroAudio();

  const [hoverCity, setHoverCity] = useState<string | null>(null);
  const [hoverPos2D, setHoverPos2D] = useState<{ x: number; y: number } | null>(null);

  const [focusTarget, setFocusTarget] = useState<FocusTarget>(null);
  const controlsRef = useRef<any>(null);

  const handleClickCity = (_name: string, pos: THREE.Vector3) => {
    const dir = pos.clone().normalize();
    const cam = dir.clone().multiplyScalar(3.2);
    const lookAt = pos.clone().multiplyScalar(0.85);
    setFocusTarget({ camPos: cam, lookAt });
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background:
          "radial-gradient(1200px 800px at 70% 30%, #0b2a4a 0%, #02050c 55%, #000 100%)",
        position: "relative",
        overflow: "visible",
        color: "white",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      }}
    >
      {/* Audio UI */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 30,
          padding: "10px 12px",
          borderRadius: 14,
          background: "rgba(0,0,0,0.25)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          pointerEvents: "auto",
        }}
      >
        <button
          onClick={toggle}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: 18,
            cursor: "pointer",
          }}
          title={!audioReady ? "Clique d’abord sur la page" : undefined}
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVol(Number(e.target.value))}
          style={{ width: 90, cursor: "pointer" }}
        />
      </div>

      {!audioReady && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 30,
            padding: "10px 12px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.22)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            fontSize: 13,
            opacity: 0.9,
            pointerEvents: "none",
          }}
        >
          Cliquez une fois pour activer le son 🎵
        </div>
      )}

      {/* Tooltip */}
      {hoverCity && hoverPos2D && (
        <div
          style={{
            position: "absolute",
            left: hoverPos2D.x + 12,
            top: hoverPos2D.y - 10,
            zIndex: 40,
            padding: "8px 10px",
            borderRadius: 10,
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            fontSize: 13,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {hoverCity}
        </div>
      )}

      {/* Overlay texte */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "16vh",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "min(760px, 90vw)",
            padding: "12px 18px",
            borderRadius: 14,
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "0 14px 40px rgba(0,0,0,0.45), 0 0 32px rgba(74,163,255,0.12)",
            animation: "fadeUp 1.1s ease-out forwards",
          }}
        >
          <div style={{ fontSize: "clamp(22px, 4vw, 42px)", fontWeight: 800 }}>
            Bienvenue sur le portfolio 
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: "clamp(12px, 2vw, 18px)",
              letterSpacing: "1.5px",
              opacity: 0.9,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            De Monsieur{" "}
            <span style={{ color: "#4aa3ff" }}>
              ANGOUNE UDUMA IDIKA LIONNEL
            </span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Canvas
          camera={{ position: [0, 0.2, 3.4], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          onPointerMove={(e) => {
            if (!hoverCity) return;
            setHoverPos2D({ x: e.clientX, y: e.clientY });
          }}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 2, 3]} intensity={1.25} />
          <pointLight position={[-4, -1, -3]} intensity={0.5} />
          <Stars radius={40} depth={18} count={3200} factor={3} fade />

          <Suspense fallback={<Loader />}>
            <EarthGroup
              onHoverCity={(name) => {
                setHoverCity(name);
                if (!name) setHoverPos2D(null);
              }}
              onClickCity={handleClickCity}
            />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.6}
            minDistance={2.1}
            maxDistance={6}
          />

          <CameraRig target={focusTarget} controlsRef={controlsRef} />
        </Canvas>
      </div>
    </div>
  );
}