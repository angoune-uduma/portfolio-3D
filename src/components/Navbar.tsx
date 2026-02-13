import React from "react";
import AudioControl from "./AudioControl";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NavPill({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 18px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: active ? "rgba(74,163,255,0.18)" : "rgba(0,0,0,0.25)",
        color: "white",
        fontWeight: 750,
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        boxShadow: active
          ? "0 14px 40px rgba(0,0,0,0.35)"
          : "0 12px 35px rgba(0,0,0,0.22)",
        transition: "transform .15s ease, opacity .15s ease, background .2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>
      {label}
    </button>
  );
}

function NavLinkDownload({
  label,
  icon,
  href,
}: {
  label: string;
  icon: string;
  href: string;
}) {
  return (
    <a
      href={href}
      download
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 18px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(0,0,0,0.25)",
        color: "white",
        fontWeight: 750,
        cursor: "pointer",
        textDecoration: "none",
        backdropFilter: "blur(12px)",
        boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
        transition: "transform .15s ease, opacity .15s ease, background .2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      title="Télécharger le CV"
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>
      {label}
    </a>
  );
}

export default function Navbar({
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
  const [active, setActive] = React.useState<"home" | "projects" | "contact">(
    "home"
  );

  React.useEffect(() => {
    const ids: Array<"home" | "projects" | "contact"> = [
      "home",
      "projects",
      "contact",
    ];

    const onScroll = () => {
      const y = window.scrollY + 120;
      let current: typeof active = "home";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (y >= el.offsetTop) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        width: "min(1180px, 92vw)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          padding: "12px 14px",
          borderRadius: 22,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(0,0,0,0.25)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 22px 80px rgba(0,0,0,0.45)",
        }}
      >
        {/* Left identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background:
                "radial-gradient(circle at 30% 30%, rgba(74,163,255,0.65), rgba(0,0,0,0.2) 60%)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 850, color: "white" }}>
              ANGOUNE UDUMA idika lionnel
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
              Portfolio • 3D • Design
            </div>
          </div>
        </div>

        {/* Right nav + audio */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <NavPill
            label="Accueil"
            icon="🏠"
            active={active === "home"}
            onClick={() => scrollToId("home")}
          />
          <NavPill
            label="Projets"
            icon="🧩"
            active={active === "projects"}
            onClick={() => scrollToId("projects")}
          />
          <NavPill
            label="Contact"
            icon="✉️"
            active={active === "contact"}
            onClick={() => scrollToId("contact")}
          />

          <NavLinkDownload label="Mon CV" icon="📄" href="/cv-idika-lionnel.pdf" />

          {/* ✅ Audio intégré (plus aucun chevauchement) */}
          <AudioControl
            isPlaying={isPlaying}
            volume={volume}
            toggle={toggle}
            setVol={setVol}
          />
        </div>
      </div>
    </div>
  );
}