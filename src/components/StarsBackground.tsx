import React from "react";

export default function StarsBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",

        // 2 couches de patterns répétées → densité forte
        backgroundImage: `
          radial-gradient(1px 1px at 25px 25px, rgba(255,255,255,0.95), transparent 60%),
          radial-gradient(1px 1px at 75px 75px, rgba(255,255,255,0.70), transparent 60%),
          radial-gradient(1px 1px at 125px 20px, rgba(255,255,255,0.55), transparent 60%),
          radial-gradient(1px 1px at 10px 140px, rgba(255,255,255,0.50), transparent 60%),
          radial-gradient(1px 1px at 140px 110px, rgba(255,255,255,0.65), transparent 60%),

          radial-gradient(2px 2px at 40px 60px, rgba(74,163,255,0.40), transparent 60%),
          radial-gradient(2px 2px at 160px 90px, rgba(74,163,255,0.25), transparent 60%),
          radial-gradient(2px 2px at 90px 160px, rgba(74,163,255,0.20), transparent 60%)
        `,
        backgroundSize: "180px 180px",
        backgroundRepeat: "repeat",

        // IMPORTANT pour que ça se voie
        opacity: 0.85,

        // Glow léger
        filter: "drop-shadow(0 0 8px rgba(74,163,255,0.12))",
      }}
    />
  );
}