import React from "react";

export default function AudioControl({
  isPlaying,
  volume,
  toggle,
  setVol,
}: {
  isPlaying: boolean;
  volume: number;
  toggle: () => void;
  setVol: (v: number) => void;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 999,
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
      }}
    >
      <button
        type="button"
        onClick={toggle}
        style={{
          width: 34,
          height: 34,
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "white",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          fontSize: 15,
        }}
        title={isPlaying ? "Pause" : "Lecture"}
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
        style={{ width: 110, cursor: "pointer" }}
        aria-label="Volume"
      />
    </div>
  );
}