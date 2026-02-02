import React, { useEffect, useMemo, useRef, useState } from "react";

type SectionId = "home" | "projects" | "contact";

function scrollToId(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          setActive(visible.target.id as SectionId);
        }
      },
      {
        root: null,
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: "-25% 0px -55% 0px",
      }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        width: 18,
        height: 18,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.9,
      }}
    >
      {children}
    </span>
  );
}

export default function Navbar() {
  const ids = useMemo(() => ["home", "projects", "contact"] as SectionId[], []);
  const active = useActiveSection(ids);

  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const Item = ({
    id,
    label,
    icon,
  }: {
    id: SectionId;
    label: string;
    icon: React.ReactNode;
  }) => {
    const isActive = active === id;
    return (
      <button
        onClick={() => {
          setOpen(false);
          scrollToId(id);
        }}
        style={{
          appearance: "none",
          border: "1px solid rgba(255,255,255,0.14)",
          background: isActive ? "rgba(74,163,255,0.18)" : "rgba(0,0,0,0.22)",
          color: "white",
          padding: "10px 12px",
          borderRadius: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          fontWeight: 750,
          backdropFilter: "blur(10px)",
          transition: "transform 0.12s ease, opacity 0.12s ease",
          boxShadow: isActive ? "0 14px 40px rgba(0,0,0,0.35)" : "none",
          opacity: isActive ? 1 : 0.92,
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Icon>{icon}</Icon>
        {label}
      </button>
    );
  };

  return (
    <>
      {/* Sticky Navbar */}
      <div
        style={{
          position: "fixed",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 80,
          width: "min(980px, 94vw)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 12px",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                background:
                  "radial-gradient(12px 12px at 30% 30%, rgba(74,163,255,0.9) 0%, rgba(74,163,255,0.2) 60%, rgba(0,0,0,0) 100%)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 0 30px rgba(74,163,255,0.25)",
              }}
            />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontWeight: 900, letterSpacing: "-0.3px" }}>
                ANGOUNE UDUMA idika lionnel
              </div>
              <div style={{ fontSize: 12, opacity: 0.72 }}>
                Portfolio • 3D • Design
              </div>
            </div>
          </div>

          {/* Desktop menu */}
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <div className="nav-desktop" style={{ display: "flex", gap: 10 }}>
              <Item id="home" label="Accueil" icon={"🏠"} />
              <Item id="projects" label="Projets" icon={"🧩"} />
              <Item id="contact" label="Contact" icon={"✉️"} />
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              style={{
                appearance: "none",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.22)",
                color: "white",
                padding: "10px 12px",
                borderRadius: 14,
                cursor: "pointer",
                fontWeight: 800,
                backdropFilter: "blur(10px)",
                display: "none",
              }}
              className="nav-mobile-toggle"
              aria-label="Menu"
              title="Menu"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div
            style={{
              marginTop: 10,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.28)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
              padding: 12,
              pointerEvents: "auto",
              display: "grid",
              gap: 10,
            }}
          >
            <Item id="home" label="Accueil" icon={"🏠"} />
            <Item id="projects" label="Projets" icon={"🧩"} />
            <Item id="contact" label="Contact" icon={"✉️"} />
          </div>
        )}
      </div>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => scrollToId("home")}
          style={{
            position: "fixed",
            right: 18,
            bottom: 18,
            zIndex: 90,
            appearance: "none",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(0,0,0,0.26)",
            color: "white",
            padding: "12px 14px",
            borderRadius: 16,
            cursor: "pointer",
            fontWeight: 850,
            backdropFilter: "blur(12px)",
            boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
          }}
          title="Retour en haut"
        >
          ↑
        </button>
      )}

      {/* Tiny CSS for mobile */}
      <style>
        {`
          @media (max-width: 720px) {
            .nav-desktop { display: none !important; }
            .nav-mobile-toggle { display: inline-flex !important; }
          }
        `}
      </style>
    </>
  );
}