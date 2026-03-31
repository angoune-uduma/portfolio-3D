import React, { useRef, useState } from "react";
import EarthAfricaPage from "./EarthAfricaPage";
import { PROJECTS } from "../data/projects";

/* =========================
   Palette
========================= */
const C = {
  bg:      "#020b12",
  bg2:     "#041018",
  bg3:     "#071822",
  cyan:    "#2ee8a5",
  violet:  "#0d9488",
  violet2: "#5eead4",
  pink:    "#99f6e4",
  white:   "#f0fdfa",
  gray:    "rgba(148,220,200,0.6)",
  border:  "rgba(46,232,165,0.2)",
};

const grad     = `linear-gradient(135deg, #0d9488, #2ee8a5)`;
const gradText = `linear-gradient(135deg, #2ee8a5 0%, #5eead4 50%, #99f6e4 100%)`;
const gradLine = `linear-gradient(90deg, #0d9488, #2ee8a5, #99f6e4)`;

/* =========================
   Scroll util
========================= */
const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* =========================
   Button
========================= */
function Btn({ children, href, onClick, primary = false }: {
  children: React.ReactNode; href?: string; onClick?: () => void; primary?: boolean;
}) {
  const s: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "11px 22px", borderRadius: 12, fontWeight: 700,
    fontSize: 13, letterSpacing: "0.4px", cursor: "pointer",
    textDecoration: "none", transition: "transform .15s, box-shadow .15s",
    border: primary ? "none" : `1px solid rgba(0,245,255,0.25)`,
    background: primary ? grad : "rgba(0,245,255,0.05)",
    color: C.white,
    boxShadow: primary ? "0 6px 24px rgba(124,58,237,0.45)" : "none",
  };
  const over  = (e: any) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = primary ? "0 12px 32px rgba(124,58,237,0.65)" : "0 0 16px rgba(0,245,255,0.2)"; };
  const leave = (e: any) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = primary ? "0 6px 24px rgba(124,58,237,0.45)" : "none"; };
  if (href) return <a href={href} target="_blank" rel="noreferrer" style={s} onMouseEnter={over} onMouseLeave={leave}>{children}</a>;
  return <button type="button" onClick={onClick} style={s} onMouseEnter={over} onMouseLeave={leave}>{children}</button>;
}

/* =========================
   Section header
========================= */
function SectionHead({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, marginBottom: 8, background: gradText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{tag}</div>
      <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 900, color: C.white, letterSpacing: "-0.5px", marginBottom: 6 }}>{title}</h2>
      <div style={{ width: 52, height: 3, borderRadius: 2, background: gradLine, margin: "10px 0" }} />
      {sub && <p style={{ color: C.gray, fontSize: ".93rem", lineHeight: 1.7, maxWidth: 560 }}>{sub}</p>}
    </div>
  );
}

/* =========================
   Skills
========================= */
const SKILLS = [
  { label: "React.js",       cat: "frontend"  },
  { label: "Vue.js",         cat: "frontend"  },
  { label: "Android",        cat: "frontend"  },
  { label: "Node.js",        cat: "backend"   },
  { label: "PHP/Symfony",    cat: "backend"   },
  { label: "C#/ASP.NET",     cat: "backend"   },
  { label: "MongoDB",        cat: "backend"   },
  { label: "MySQL",          cat: "backend"   },
  { label: "Docker",         cat: "devops"    },
  { label: "GCP",            cat: "devops"    },
  { label: "Azure",          cat: "devops"    },
  { label: "CI/CD",          cat: "devops"    },
  { label: "GitHub Actions", cat: "devops"    },
  { label: "OWASP",          cat: "security"  },
  { label: "JWT",            cat: "security"  },
  { label: "DevSecOps",      cat: "security"  },
];

const catStyle: Record<string, { bg: string; border: string; color: string }> = {
  frontend: { bg: "rgba(0,245,255,0.1)",    border: "rgba(0,245,255,0.3)",    color: "#00f5ff"  },
  backend:  { bg: "rgba(124,58,237,0.1)",   border: "rgba(124,58,237,0.3)",   color: "#9d5cf6"  },
  devops:   { bg: "rgba(157,92,246,0.1)",   border: "rgba(157,92,246,0.3)",   color: "#b07ef8"  },
  security: { bg: "rgba(240,0,184,0.1)",    border: "rgba(240,0,184,0.35)",   color: "#f000b8"  },
};

/* =========================
   Expériences
========================= */
const EXPS = [
  { date: "07 – 08 · 2024", role: "Stagiaire Développement Web", company: "Baïfall Dream · Paris", desc: "Développement de sites web responsifs (HTML, CSS, JS, Node.js), optimisation SEO, intégration de fonctionnalités interactives." },
  { date: "07 – 08 · 2023", role: "Stagiaire Dev Web & SEO",     company: "Africa by Art · Paris",  desc: "Conception et développement de sites web, optimisation SEO et amélioration de contenu, travail en équipe pluridisciplinaire." },
];

/* =========================
   Project card
========================= */
function PCard({ project }: { project: any }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.bg3 : C.bg2,
        border: `1px solid ${hov ? "rgba(0,245,255,0.3)" : C.border}`,
        borderRadius: 18, padding: "1.6rem",
        transition: "transform .3s, border-color .3s, box-shadow .3s",
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? "0 20px 40px rgba(124,58,237,0.2)" : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: gradLine }} />}
      <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>{project.emoji ?? "🛠️"}</div>
      <h3 style={{ fontWeight: 800, fontSize: "1rem", color: C.white, marginBottom: 8 }}>{project.title}</h3>
      <p style={{ color: C.gray, fontSize: ".85rem", lineHeight: 1.65, marginBottom: 12 }}>{project.description}</p>
      {project.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {project.tags.map((t: string) => (
            <span key={t} style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: C.violet2, padding: "3px 10px", borderRadius: 20, fontSize: ".7rem", fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        {project.demo && <Btn href={project.demo}>🔗 Demo</Btn>}
        {project.repo && <Btn href={project.repo}>🐙 Repo</Btn>}
      </div>
    </div>
  );
}

/* =========================
   Page
========================= */
export default function PortfolioPage() {
  return (
<<<<<<< HEAD
    <div style={{ width: "100%", minHeight: "100vh", background: C.bg, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", color: C.white }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        background: "rgba(7,8,15,0.85)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6%", height: 60,
      }}>
        <div style={{ fontWeight: 900, fontSize: "1rem", letterSpacing: 3, textTransform: "uppercase", background: gradText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Lionnel · IDIKA
        </div>
        <div style={{ display: "flex", gap: "1.8rem" }}>
          {["about","projects","contact"].map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", color: C.gray, cursor: "pointer", fontSize: ".82rem", letterSpacing: "1px", textTransform: "uppercase", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.cyan)}
              onMouseLeave={e => (e.currentTarget.style.color = C.gray)}>
              {id}
            </button>
          ))}
        </div>
        <Btn href="mailto:alexidika1@gmail.com" primary>Contact</Btn>
      </nav>

      {/* ── HERO (globe) ── */}
      <section id="home" style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <EarthAfricaPage />
        <button type="button" onClick={() => scrollTo("about")} style={{
          position: "absolute", left: "50%", bottom: 22, transform: "translateX(-50%)",
          zIndex: 60, padding: "10px 22px", borderRadius: 999,
          background: "rgba(124,58,237,0.15)", border: `1px solid ${C.border}`,
          backdropFilter: "blur(12px)", color: C.white, cursor: "pointer", fontSize: 13,
        }}>
          ↓ Découvrir le portfolio
        </button>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "90px 6%", background: C.bg, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <SectionHead tag="// Qui suis-je" title={`Fullstack & Cybersécurité`} />
            <p style={{ color: C.gray, lineHeight: 1.8, fontSize: ".95rem", marginBottom: 24 }}>
              Étudiant en <strong style={{ color: C.white }}>Master 1 Cybersécurité</strong> à SUPINFO Lille.
              Passionné par la conception logicielle sécurisée, le DevSecOps et l'architecture cloud.
              Je conçois des applications robustes, du frontend au déploiement.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn href="mailto:alexidika1@gmail.com" primary>📩 Me contacter</Btn>
              <Btn href="https://www.linkedin.com/in/idika-lionnel-angoune-uduma-5a2820265/">🧷 LinkedIn</Btn>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: C.gray, marginBottom: 14 }}>Stack & compétences</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILLS.map(s => {
                const cs = catStyle[s.cat];
                return (
                  <span key={s.label} style={{ background: cs.bg, border: `1px solid ${cs.border}`, color: cs.color, padding: "5px 13px", borderRadius: 20, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".4px" }}>
                    {s.label}
                  </span>
                );
              })}
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
              {Object.entries({ Frontend: C.cyan, Backend: C.violet2, DevOps: "#b07ef8", Security: C.pink }).map(([k, v]) => (
                <span key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.gray }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: v, display: "inline-block" }} />{k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPÉRIENCES ── */}
      <section style={{ padding: "70px 6%", background: C.bg2, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead tag="// Parcours" title="Expériences" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {EXPS.map(e => (
              <div key={e.role} style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 16, padding: "1.5rem 2rem", display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ minWidth: 130, color: C.gray, fontSize: ".8rem", letterSpacing: ".5px", paddingTop: 3 }}>{e.date}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 3 }}>{e.role}</div>
                  <div style={{ background: gradText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: ".8rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{e.company}</div>
                  <p style={{ color: C.gray, fontSize: ".87rem", lineHeight: 1.65 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "80px 6%", background: C.bg, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead tag="// Projets & Réalisations" title="Ce que j'ai construit" sub="Projets académiques, perso et pro. Code propre, sécu intégrée." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 18 }}>
            {PROJECTS.map(p => <PCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "80px 6% 60px", background: C.bg2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHead tag="// Travaillons ensemble" title="Contactez-moi" />
          <div style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: `linear-gradient(135deg, ${C.bg3}, ${C.bg2})`, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Lionnel IDIKA ANGOUNE UDUMA</div>
              <div style={{ background: gradText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, fontSize: ".85rem", letterSpacing: ".5px", marginBottom: 6 }}>Fullstack · AppSec · DevSecOps</div>
              <p style={{ color: C.gray, fontSize: ".88rem", lineHeight: 1.65 }}>API sécurisées, CI/CD, cloud, déploiement — je gère le concret.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn href={`mailto:alexidika1@gmail.com?subject=${encodeURIComponent("Contact — Portfolio")}`} primary>📩 Email</Btn>
              <Btn href={`https://wa.me/33783251110?text=${encodeURIComponent("Salut Lionnel, je te contacte suite à ton portfolio.")}`}>💬 WhatsApp</Btn>
              <Btn href="https://www.linkedin.com/in/idika-lionnel-angoune-uduma-5a2820265/">🧷 LinkedIn</Btn>
            </div>
          </div>
          <footer style={{ marginTop: 32, color: C.gray, fontSize: 12, textAlign: "center", letterSpacing: ".5px" }}>
            © {new Date().getFullYear()} —{" "}
            <span style={{ background: gradText, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>
              IDIKA LIONNEL ANGOUNE UDUMA
            </span>
          </footer>
        </div>
      </section>
    </div>
  );
}