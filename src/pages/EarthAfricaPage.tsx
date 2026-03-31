import GlobeCanvas from "../components/GlobeCanvas";

const TEAL  = "#2ee8a5";
const TEAL2 = "#0d9488";
const LIGHT = "#99f6e4";

const gradText = `linear-gradient(135deg, ${TEAL} 0%, #5eead4 50%, ${LIGHT} 100%)`;

export default function EarthAfricaPage() {
  return (
    <div style={{
      height: "100%", width: "100%", position: "relative", overflow: "hidden",
      background: "radial-gradient(ellipse at 60% 40%, #021a14 0%, #020b12 60%, #000 100%)",
      color: "#f0fdfa",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    }}>

      {/* Blob turquoise top-right */}
      <div style={{
        position: "absolute", top: -120, right: -120, width: 500, height: 500,
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(46,232,165,0.14), transparent 70%)",
      }}/>
      {/* Blob teal bottom-left */}
      <div style={{
        position: "absolute", bottom: -80, left: -80, width: 400, height: 400,
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(13,148,136,0.08), transparent 70%)",
      }}/>

      {/* Globe centré */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1,
      }}>
        <GlobeCanvas size={480} />
      </div>

      {/* Overlay texte hero */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        paddingBottom: "15vh", pointerEvents: "none", textAlign: "center",
      }}>
        <div style={{
          width: "min(780px, 90vw)", padding: "18px 24px", borderRadius: 18,
          background: "rgba(2,11,18,0.55)",
          border: "1px solid rgba(46,232,165,0.2)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(46,232,165,0.07)",
        }}>
          <div style={{
            fontSize: "clamp(22px, 4vw, 44px)", fontWeight: 900,
            letterSpacing: "-1px", lineHeight: 1.1,
            background: `linear-gradient(135deg, #f0fdfa 30%, ${TEAL} 70%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Bienvenue sur le portfolio
          </div>
          <div style={{
            marginTop: 8, fontSize: "clamp(11px, 1.8vw, 15px)",
            letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase",
          }}>
            de{" "}
            <span style={{
              background: gradText,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              IDIKA LIONNEL ANGOUNE UDUMA
            </span>
          </div>
          <div style={{
            marginTop: 8, fontSize: 12,
            color: "rgba(153,246,228,0.6)", letterSpacing: "1px",
          }}>
            Fullstack · Cybersécurité · DevSecOps
          </div>
        </div>
      </div>
    </div>
  );
}