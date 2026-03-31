import { useEffect, useRef } from "react";

const TEAL  = "#2ee8a5";
const TEAL2 = "#0d9488";
const LIGHT = "#99f6e4";

const COUNTRIES: [number, number][][] = [
  [[71,28],[70,18],[65,14],[58,5],[51,2],[44,0],[36,5],[36,28],[45,30],[48,40],[55,37],[60,30],[65,25],[70,25],[71,28]],
  [[37,10],[37,37],[12,44],[0,42],[-10,40],[-35,27],[-35,18],[-17,12],[0,9],[5,2],[15,0],[20,17],[30,32],[37,25],[37,10]],
  [[70,-140],[72,-120],[72,-80],[60,-65],[45,-53],[25,-77],[15,-85],[8,-77],[10,-62],[20,-87],[30,-110],[32,-117],[40,-124],[49,-125],[60,-138],[70,-140]],
  [[10,-63],[8,-77],[0,-78],[-5,-81],[-18,-70],[-35,-58],[-55,-68],[-55,-64],[-40,-62],[-25,-48],[-5,-35],[5,-52],[10,-63]],
  [[70,30],[72,80],[70,140],[60,150],[45,142],[35,130],[22,114],[10,105],[0,105],[-8,115],[8,98],[22,90],[28,80],[15,75],[28,60],[30,48],[25,37],[12,44],[37,37],[45,42],[55,60],[65,60],[70,30]],
  [[-15,130],[-13,142],[-25,153],[-38,146],[-38,140],[-32,116],[-22,114],[-15,130]],
  [[83,-45],[83,-15],[72,-18],[65,-38],[65,-52],[72,-58],[83,-45]],
];

const CITIES: [number, number][] = [
  [48.8,2.3],[50.6,3.1],[51.5,-0.1],[52.5,13.4],[40.4,-3.7],[41.9,12.5],
  [0.4,9.4],[6.4,2.4],[6.1,1.2],[9.0,8.7],[5.6,-0.2],[-1.3,36.8],[30.0,31.2],
  [40.7,-74.0],[34.0,-118.2],[-23.5,-46.6],[-34.6,-58.4],
  [35.7,139.7],[37.5,127.0],[31.2,121.5],[1.3,103.8],
  [25.2,55.3],[28.6,77.2],[-33.9,151.2],
];

const ARC_PAIRS: [number, number][] = [
  [0,6],[0,7],[0,8],[0,9],[1,6],[2,13],[4,14],[6,11],[9,22],
];

export default function GlobeCanvas({ size = 480 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = size, H = size;
    const cx = W / 2, cy = H / 2, R = size * 0.396;
    let rot = 0, t = 0, raf = 0;

    const particles = ARC_PAIRS.map(([a, b]) => ({
      a, b, p: Math.random(), spd: 0.004 + Math.random() * 0.003,
    }));

    function proj(lat: number, lon: number) {
      const phi = (lat * Math.PI) / 180;
      const lam = (lon * Math.PI) / 180 + rot;
      const x = Math.cos(phi) * Math.sin(lam);
      const y = -Math.sin(phi);
      const z = Math.cos(phi) * Math.cos(lam);
      return { sx: cx + R * x, sy: cy + R * y, z };
    }

    function lerpCity(a: number, b: number, pct: number) {
      const lat = CITIES[a][0] + (CITIES[b][0] - CITIES[a][0]) * pct;
      const lon = CITIES[a][1] + (CITIES[b][1] - CITIES[a][1]) * pct;
      const lift = Math.sin(pct * Math.PI) * 0.4;
      const phi = (lat * Math.PI) / 180;
      const lam = (lon * Math.PI) / 180 + rot;
      const x = Math.cos(phi) * Math.sin(lam);
      const y = -Math.sin(phi);
      const z = Math.cos(phi) * Math.cos(lam);
      const s = R * (1 + lift);
      return { sx: cx + s * x, sy: cy + s * y, z };
    }

    function drawGrid() {
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath(); let f = true;
        for (let lon = 0; lon <= 360; lon += 2) {
          const p = proj(lat, lon);
          if (p.z < 0) { f = true; continue; }
          f ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy); f = false;
        }
        ctx.strokeStyle = "rgba(46,232,165,0.12)"; ctx.lineWidth = 0.6; ctx.stroke();
      }
      for (let lon = 0; lon < 360; lon += 20) {
        ctx.beginPath(); let f = true;
        for (let lat = -85; lat <= 85; lat += 2) {
          const p = proj(lat, lon);
          if (p.z < 0) { f = true; continue; }
          f ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy); f = false;
        }
        ctx.strokeStyle = "rgba(13,148,136,0.12)"; ctx.lineWidth = 0.6; ctx.stroke();
      }
    }

    function drawCountries() {
      COUNTRIES.forEach(poly => {
        const pts = poly.map(([la, lo]) => proj(la, lo));
        const avgZ = pts.reduce((s, p) => s + p.z, 0) / pts.length;
        if (avgZ < -0.2) return;
        const alpha = Math.max(0, (avgZ + 0.2) / 1.2);
        ctx.beginPath();
        ctx.moveTo(pts[0].sx, pts[0].sy);
        pts.forEach(p => ctx.lineTo(p.sx, p.sy));
        ctx.closePath();
        ctx.fillStyle = `rgba(13,148,136,${0.06 + alpha * 0.1})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(46,232,165,${0.2 + alpha * 0.55})`;
        ctx.lineWidth = 0.9; ctx.stroke();
      });
    }

    function drawArcs() {
      ARC_PAIRS.forEach(([a, b]) => {
        ctx.beginPath(); let s = false;
        for (let i = 0; i <= 60; i++) {
          const p = lerpCity(a, b, i / 60);
          if (p.z < 0) { s = false; continue; }
          s ? ctx.lineTo(p.sx, p.sy) : ctx.moveTo(p.sx, p.sy); s = true;
        }
        ctx.strokeStyle = "rgba(46,232,165,0.18)"; ctx.lineWidth = 0.8; ctx.stroke();
      });
    }

    function drawParticles() {
      particles.forEach(par => {
        par.p += par.spd; if (par.p > 1) par.p = 0;
        const p = lerpCity(par.a, par.b, par.p);
        if (p.z < 0) return;
        for (let i = 1; i <= 5; i++) {
          const tp = lerpCity(par.a, par.b, Math.max(0, par.p - i * 0.018));
          if (tp.z < 0) continue;
          ctx.beginPath(); ctx.arc(tp.sx, tp.sy, 1.5 * (1 - i / 6), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(46,232,165,${0.35 * (1 - i / 6)})`; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = TEAL; ctx.fill();
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(46,232,165,0.15)"; ctx.fill();
      });
    }

    function drawCities() {
      CITIES.forEach(([lat, lon]) => {
        const p = proj(lat, lon);
        if (p.z < 0.05) return;
        const alpha = Math.min(1, (p.z - 0.05) / 0.3);
        const pulse = (Math.sin(t * 3 + lat) + 1) / 2;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 3 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(46,232,165,${0.3 * alpha * (1 - pulse)})`; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(153,246,228,${0.9 * alpha})`; ctx.fill();
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
      });
    }

    function drawRings() {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.8);
      ctx.beginPath(); ctx.arc(0, 0, R * 1.1, -0.5, 0.5);
      ctx.strokeStyle = "rgba(46,232,165,0.5)"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, R * 1.16, -0.25, 0.25);
      ctx.strokeStyle = "rgba(13,148,136,0.3)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.restore();

      ctx.save(); ctx.translate(cx, cy); ctx.scale(1, 0.28); ctx.rotate(t * 0.2);
      ctx.beginPath(); ctx.arc(0, 0, R * 1.28, 0, Math.PI * 2);
      ctx.setLineDash([5, 9]);
      ctx.strokeStyle = "rgba(46,232,165,0.2)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(R * 1.28, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(46,232,165,0.9)"; ctx.fill();
      ctx.restore();

      const brd = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      brd.addColorStop(0, "rgba(13,148,136,0.6)");
      brd.addColorStop(0.5, "rgba(46,232,165,0.9)");
      brd.addColorStop(1, "rgba(153,246,228,0.6)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = brd; ctx.lineWidth = 1.5; ctx.stroke();

      for (let i = 1; i <= 3; i++) {
        ctx.beginPath(); ctx.arc(cx, cy, R + i * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(46,232,165,${0.05 / i})`; ctx.lineWidth = i * 2.5; ctx.stroke();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      const fy = Math.sin(t * 0.07) * 14;

      ctx.save(); ctx.translate(0, fy);
      drawRings();

      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();

      const bg = ctx.createRadialGradient(cx - 30, cy - 30, 0, cx, cy, R);
      bg.addColorStop(0, "rgba(2,26,20,0.7)");
      bg.addColorStop(1, "rgba(2,11,18,0.85)");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      drawGrid();
      drawCountries();
      drawArcs();
      drawParticles();
      drawCities();

      const lens = ctx.createRadialGradient(cx - R * 0.45, cy - R * 0.45, 0, cx - R * 0.45, cy - R * 0.45, R * 0.55);
      lens.addColorStop(0, "rgba(46,232,165,0.07)");
      lens.addColorStop(1, "rgba(46,232,165,0)");
      ctx.fillStyle = lens; ctx.fillRect(0, 0, W, H);

      ctx.restore();
      ctx.restore();

      rot += 0.004;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
}