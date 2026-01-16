import { motion } from "framer-motion";

/* Frontend Icon */
const FrontendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="12" rx="2" stroke="#B7FF3C" strokeWidth="2"/>
    <path d="M8 20h8" stroke="#B7FF3C" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

/* Backend Icon */
const BackendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="5" rx="7" ry="3" stroke="#B7FF3C" strokeWidth="2"/>
    <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" stroke="#B7FF3C" strokeWidth="2"/>
    <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="#B7FF3C" strokeWidth="2"/>
  </svg>
);

export default function SkillBar({ title, level, category }) {
  const isFrontend = title === "Frontend & UI";
  const isBackend = title === "Backend & API";

  return (
    <div className="skill-card">
      {/* Header */}
      <div className="skill-header">
        <div className="skill-icon">
          {isFrontend && <FrontendIcon />}
          {isBackend && <BackendIcon />}
        </div>
        <h2>{title}</h2>
      </div>

      {/* Skill content */}
      <div className="skill-top">
        <h3>{category}</h3>
        <span className="skill-percent">{level}%</span>
      </div>

      <div className="skill-bar">
        <span style={{ width: `${level}%` }} />
      </div>

      <div className="skill-category">
        {category.toUpperCase()}
      </div>
    </div>
  );
}
