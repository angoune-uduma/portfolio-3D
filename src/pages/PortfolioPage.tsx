import React from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import EarthAfricaPage from "./EarthAfricaPage";
import StarsBackground from "../components/StarsBackground";
import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "../data/projects";

/* =========================
   Utils
========================= */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================
   Button
========================= */
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
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(10px)",
    background:
      variant === "primary"
        ? "rgba(74,163,255,0.18)"
        : "rgba(0,0,0,0.22)",
    color: "white",
    boxShadow:
      variant === "primary" ? "0 14px 40px rgba(0,0,0,0.35)" : "none",
    transition: "transform 0.15s ease, opacity 0.15s ease",
    textDecoration: "none",
  };

  const commonHandlers = {
    onMouseDown: (e: any) => (e.currentTarget.style.transform = "scale(0.98)"),
    onMouseUp: (e: any) => (e.currentTarget.style.transform = "scale(1)"),
    onMouseLeave: (e: any) => (e.currentTarget.style.transform = "scale(1)"),
  };

  if (href) {
    return (
      <a href={href} style={base} {...commonHandlers}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} style={base} {...commonHandlers}>
      {children}
    </button>
  );
}

/* =========================
   Motion variants
========================= */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* =========================
   Page
========================= */
export default function PortfolioPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#000" }}>
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        id="home"
        style={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <EarthAfricaPage />

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
            color: "rgba(255,255,255,0.88)",
            cursor: "pointer",
          }}
          aria-label="Aller à la section projets"
          title="Aller aux projets"
        >
          ↓ Scroll pour voir le portfolio
        </button>
      </section>

      {/* ================= PROJECTS ================= */}
      <section
        id="projects"
        style={{
          position: "relative",
          padding: "88px 0",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 25%, #000 100%)",
        }}
      >
        <StarsBackground />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "min(1100px, 92vw)",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Portfolio
              </div>
              <h2
                style={{
                  marginTop: 8,
                  fontSize: "clamp(28px, 4vw, 46px)",
                  letterSpacing: "-0.6px",
                  color: "white",
                }}
              >
                Projets & Réalisations
              </h2>
              <p style={{ color: "rgba(255,255,255,0.72)", marginTop: 10 }}>
                Voici quelques projets. Clique pour une démo, un repo, ou contacte
                moi.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => scrollToId("contact")} variant="primary">
                ✉️ Me contacter
              </Button>
              <Button onClick={() => scrollToId("projects")} variant="ghost">
                📌 Voir les projets
              </Button>
            </div>
          </div>

          {/* Grid avec STAGGER */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={gridVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {PROJECTS.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
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

              <div
                style={{
                  color: "rgba(255,255,255,0.72)",
                  marginTop: 6,
                  lineHeight: 1.6,
                }}
              >
                Full-stack • AppSec • DevSecOps
                <br />
                API, sécurité, CI/CD & déploiement : je m’occupe du concret.
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {/* EMAIL */}
              <a
                href={`mailto:Idika.lionnel@gmail.com?subject=${encodeURIComponent(
                  "Contact — Portfolio"
                )}&body=${encodeURIComponent(
                  "Salut Lionnel,\n\nJe te contacte pour…\n\nContexte :\nObjectif :\nDélai :\n\nMerci !"
                )}`}
                style={{
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
                  background: "rgba(74,163,255,0.18)",
                  boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
                  color: "white",
                  transition: "transform 0.15s ease",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.98)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                📩 Email
              </a>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/33783251110?text=${encodeURIComponent(
                  "Salut Lionnel, je te contacte suite à ton portfolio."
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
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
                  background: "rgba(0,0,0,0.22)",
                  color: "white",
                  transition: "transform 0.15s ease",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.98)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                💬 WhatsApp
              </a>

              {/* LINKEDIN */}
              <a
                href="https://www.linkedin.com/in/idika-lionnel-angoune-uduma-5a2820265/"
                target="_blank"
                rel="noreferrer"
                style={{
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
                  background: "rgba(0,0,0,0.22)",
                  color: "white",
                  transition: "transform 0.15s ease",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.98)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                🧷 LinkedIn
              </a>
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
            © {new Date().getFullYear()} — ANGOUNE UDUMA IDIKA LIONNEL
          </footer>
        </div>
      </section>
    </div>
  );
}