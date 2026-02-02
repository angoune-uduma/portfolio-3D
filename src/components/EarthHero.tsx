import React from "react";
import EarthAfricaPage from "../pages/EarthAfricaPage";

/**
 * EarthHero = réutilise ton EarthAfricaPage comme Hero.
 * Si tu préfères, on peut extraire le canvas dans un composant plus clean ensuite.
 */
export default function EarthHero() {
  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <EarthAfricaPage />
    </div>
  );
}