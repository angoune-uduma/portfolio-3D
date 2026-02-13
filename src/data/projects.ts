// src/data/projects.ts

export type Project = {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  link?: string;
  repo?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  // ====== PROJETS RÉALISÉS (CV) ======
  {
    id: "collab-project-manager",
    title: "Application Web — Gestion de projets collaboratifs",
    desc: "Plateforme type Trello : auth JWT, rôles, gestion des tâches, API Node.js, MongoDB, déploiement containerisé Docker.",
    tags: ["React", "Node.js", "MongoDB", "Docker", "JWT", "RBAC"],
    featured: true,
  },
  {
    id: "secure-rest-api-mobile",
    title: "API REST sécurisée pour une app mobile",
    desc: "API Express (MVC) : validation, authentification par tokens, logique métier propre et routes sécurisées.",
    tags: ["Express", "Node.js", "NoSQL", "MVC", "Auth", "Validation"],
  },
  {
    id: "cicd-node-gcp",
    title: "CI/CD — App Node.js avec Docker (GitHub Actions + GCP)",
    desc: "Pipeline automatisé build/test/deploy : conteneurisation, push registry, déploiement sur GCP.",
    tags: ["CI/CD", "GitHub Actions", "Docker", "GCP", "DevOps"],
    featured: true,
  },
  {
    id: "web-app-security-hardening",
    title: "Sécurisation d’une application Web (OWASP)",
    desc: "Audit + corrections : protections XSS/CSRF, gestion des droits, HTTPS, durcissement et gestion d’erreurs.",
    tags: ["AppSec", "OWASP", "XSS/CSRF", "HTTPS", "Security"],
  },

  // ====== PROJETS “SUPINFO B3 / M1” (pertinents + wow) ======
  {
    id: "cloud-architecture-microservices",
    title: "Architecture microservices (API Gateway + Auth)",
    desc: "Découpage en microservices, API Gateway, service d’auth, communication sécurisée et observabilité.",
    tags: ["Microservices", "API Gateway", "Auth", "Docker", "Architecture"],
  },
  {
    id: "devsecops-pipeline",
    title: "DevSecOps — Pipeline sécurisé (SAST/DAST + secrets)",
    desc: "CI/CD avec scan de code, scan dépendances, détection de secrets, policy de sécurité avant déploiement.",
    tags: ["DevSecOps", "SAST", "DAST", "CI/CD", "Security"],
    featured: true,
  },
  {
    id: "azure-gcp-cloud-lab",
    title: "Cloud Lab — Déploiement multi-environnements (GCP/Azure)",
    desc: "Infra propre : variables par environnements, logs, monitoring, gestion du scaling et coûts.",
    tags: ["Cloud", "GCP", "Azure", "Monitoring", "Scaling"],
  },
  {
    id: "docker-k8s-basics",
    title: "Container orchestration — Kubernetes (bases)",
    desc: "Déploiement d’une app conteneurisée avec services, configmaps/secrets et montée en charge.",
    tags: ["Kubernetes", "Docker", "DevOps", "Deployment"],
  },
  {
    id: "network-linux-security-lab",
    title: "Lab Réseau & Linux — durcissement + diagnostic",
    desc: "Scripts & procédures : durcissement Linux, règles firewall, logs, diagnostic réseau et sécurité de base.",
    tags: ["Linux", "Réseau", "Hardening", "Firewall", "Logs"],
  },
  {
    id: "portfolio-earth-3d",
    title: "Portfolio 3D — Globe interactif + routes animées",
    desc: "Expérience 3D premium : globe, routes de villes, tooltips, focus caméra, UI audio, design glass.",
    tags: ["React", "Three.js", "R3F", "UI/UX", "Animation"],
    featured: true,
  },
  {
  id: "soc-log-monitoring",
  title: "SOC Lab — Centralisation & analyse de logs",
  desc: "Mise en place d’une chaîne de collecte de logs (app + système), corrélation d’événements et détection d’anomalies sécurité.",
  tags: ["Cybersecurity", "Logs", "SIEM", "Monitoring", "Linux"],
},
{
  id: "data-visualization-security",
  title: "Data Visualization — Analyse d’incidents sécurité",
  desc: "Tableaux de bord interactifs pour analyser incidents, tentatives d’intrusion et métriques sécurité à partir de jeux de données.",
  tags: ["Data", "Visualization", "Security", "Dashboard", "Analysis"],
}
];