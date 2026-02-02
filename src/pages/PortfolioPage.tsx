import React from "react";
import Navbar from "../components/Navbar";
import EarthAfricaPage from "./EarthAfricaPage";
import StarsBackground from "../components/StarsBackground";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Réseau de villes sur Terre 3D",
    desc: "Globe 3D interactif : routes animées, pins, tooltips, caméra smooth, halo Afrique, musique d’intro.",
    tags: ["React", "Three.js", "R3F", "UI"],
    link: "#",
  },
  {
    title: "KallMediyen — Portfolio",
    desc: "Landing page premium avec sections projets, animations et contact.",
    tags: ["Vite", "TypeScript", "Design"],
    link: "#",
  },
  {
    title: "Projet à venir",
    desc: "Ajoute ici tes prochains projets (apps, sites, design, 3D…).",
    tags: ["Soon"],
  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Button({
  children,
  href,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "12px 16px",
    borderRadius: 14,
    fontWeight: 750,
    textDecoration: "none",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(10px)",
    transition: "transform 0.15s ease, opacity 0.15s ease",
  };

  const styles =
    variant === "primary"
      ? {
          ...base,
          background: "rgba(74,163,255,0.18)",
          boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
          color: "white",
        }
      : {
          ...base,
          background: "rgba(0,0,0,0.22)",
          color: "white",
        };

  if (href) {
    return (
      <a
        href={href}
        style={styles}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={styles}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {children}
    </button>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(0,0,0,0.25)",
        opacity: 0.9,
      }}
    >
      {text}
    </span>
  );
}

export default function PortfolioPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#000" }}>
      <Navbar />

      {/* HOME / HERO */}
      <section
        id="home"
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <EarthAfricaPage />

        {/* Bouton scroll */}
        <button
          type="button"
          onClick={() => scrollToId("projects")}
          style={{
            position: "absolute",
            left: "50%",
            bottom: 18,
            transform: "translateX(-50%)",
            zIndex: 60,
            padding: "10px 14px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.28)",
            border: "1px solid rgba(255,255,255,0.16)",
            backdropFilter: "blur(12px)",
            fontSize: 14,
            color: "rgba(255,255,255,0.88)",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
            transition: "transform 0.15s ease, opacity 0.15s ease",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.transform =
              "translateX(-50%) scale(0.98)")
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.transform = "translateX(-50%) scale(1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateX(-50%) scale(1)")
          }
          aria-label="Aller à la section projets"
          title="Aller aux projets"
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>↓</span>
          Scroll pour voir le portfolio
        </button>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{
          position: "relative",
          padding: "88px 0",
          minHeight: "100vh",
          overflow: "hidden",

          // Fond légèrement moins "plat"
          background:
            "radial-gradient(900px 500px at 50% 0%, rgba(74,163,255,0.08), transparent 60%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 30%, #000 100%)",
        }}
      >
        {/* ✅ ÉTOILES */}
        <StarsBackground />

        {/* ✅ Contenu au-dessus */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "min(1100px, 92vw)",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 26,
            }}
          >
            <div>
              <div
                style={{
                  color: "rgba(255,255,255,0.75)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontSize: 12,
                }}
              >
                Portfolio
              </div>
              <h2
                style={{
                  margin: "10px 0 0",
                  fontSize: "clamp(28px, 4vw, 46px)",
                  letterSpacing: "-0.6px",
                  color: "white",
                }}
              >
                Projets & Réalisations
              </h2>
              <p
                style={{
                  marginTop: 10,
                  maxWidth: 680,
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.6,
                }}
              >
                Voici quelques projets. Clique pour une démo, un repo, ou contacte
                moi.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button onClick={() => scrollToId("contact")} variant="primary">
                ✉️ Me contacter
              </Button>
              <Button onClick={() => scrollToId("projects")} variant="ghost">
                📌 Voir les projets
              </Button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                  padding: 18,
                  boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>
                  {p.title}
                </div>
                <p
                  style={{
                    marginTop: 10,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 14,
                  }}
                >
                  {p.tags.map((t) => (
                    <Tag key={t} text={t} />
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  {p.link && (
                    <Button href={p.link} variant="primary">
                      🔗 Démo
                    </Button>
                  )}
                  {p.repo && (
                    <Button href={p.repo} variant="ghost">
                      🧩 Repo
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding: "80px 0 60px",
          background: "#000",
        }}
      >
        <div style={{ width: "min(1100px, 92vw)", margin: "0 auto" }}>
          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.03)",
              padding: 22,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 14,
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>
                Travaillons ensemble
              </div>
              <div style={{ color: "rgba(255,255,255,0.72)", marginTop: 6 }}>
                Site, app, design, animation 3D… dis-moi ton idée.
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button href="mailto:contact@exemple.com" variant="primary">
                📩 Email
              </Button>
              <Button href="#" variant="ghost">
                💬 WhatsApp
              </Button>
              <Button href="#" variant="ghost">
                🧷 LinkedIn
              </Button>
            </div>
          </div>

          <footer
            style={{
              marginTop: 30,
              paddingBottom: 20,
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()} — Portfolio
          </footer>
        </div>
      </section>
    </div>
  );
}