import { motion } from "framer-motion";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 0 0 1px rgba(74,163,255,0.25), 0 20px 60px rgba(74,163,255,0.15)",
      }}
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(10px)",
        padding: 18,
        transition: "box-shadow 0.25s ease",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>
        {project.title}
      </div>

      <p
        style={{
          marginTop: 10,
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.6,
        }}
      >
        {project.desc}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 14,
        }}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 12,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.25)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        {project.link && (
          <a
            href={project.link}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(74,163,255,0.18)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            🔗 Démo
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            🧩 Repo
          </a>
        )}
      </div>
    </motion.div>
  );
}