import {
  ArrowUpRight,
  Sparkles,
  GitBranch,
  Check,
  Activity,
} from "lucide-react";
const artCopy = {
  en: {
    flow: "build → validate → deliver",
    foundation: "ONE SHARED FOUNDATION",
    engineering: "Engineering",
    confidence: "confidence.",
    patterns: "Patterns",
    motion: "in motion.",
    data: "data · people · places",
    help: "A little help.",
    possibility: "A new possibility.",
    connected: "CONNECTED EXPERIENCES",
    detail: "Every detail",
    counts: "counts.",
    performance: "PERFORMANCE & UNDERSTANDING",
    looking: "Looking",
    surface: "beneath the surface.",
  },
  fr: {
    flow: "construire → valider → livrer",
    foundation: "UNE BASE COMMUNE",
    engineering: "Construire",
    confidence: "la confiance.",
    patterns: "Des données",
    motion: "en mouvement.",
    data: "données · personnes · lieux",
    help: "Un coup de pouce.",
    possibility: "De nouvelles idées.",
    connected: "DES EXPÉRIENCES CONNECTÉES",
    detail: "Chaque détail",
    counts: "compte.",
    performance: "PERFORMANCE ET COMPRÉHENSION",
    looking: "Regarder",
    surface: "en profondeur.",
  },
  es: {
    flow: "construir → validar → entregar",
    foundation: "UNA BASE COMPARTIDA",
    engineering: "Construir",
    confidence: "confianza.",
    patterns: "Patrones",
    motion: "en movimiento.",
    data: "datos · personas · lugares",
    help: "Un poco de ayuda.",
    possibility: "Nuevas posibilidades.",
    connected: "EXPERIENCIAS CONECTADAS",
    detail: "Cada detalle",
    counts: "cuenta.",
    performance: "RENDIMIENTO Y COMPRENSIÓN",
    looking: "Mirar",
    surface: "más allá.",
  },
};
export default function ProjectArt({ slug, large = false, locale = "en" }) {
  const a = artCopy[locale] || artCopy.en;
  return (
    <div
      className={`project-art art-${slug} ${large ? "art-large" : ""}`}
      aria-hidden="true"
    >
      {slug === "engie-automation" ? (
        <>
          <div className="art-grid" />
          <div className="flow-card flow-top">
            <GitBranch size={18} />
            <span>{a.flow}</span>
          </div>
          <div className="flow-center">
            <span className="tiny-label">{a.foundation}</span>
            <strong>
              {a.engineering}
              <br />
              <em>{a.confidence}</em>
            </strong>
            <div className="flow-pills">
              <span>
                web <Check size={13} />
              </span>
              <span>
                mobile <Check size={13} />
              </span>
              <span>
                API <Check size={13} />
              </span>
            </div>
          </div>
          <div className="art-orbit" />
        </>
      ) : slug === "mio-predictive-models" ? (
        <>
          <div className="route-circle circle-one" />
          <div className="route-circle circle-two" />
          <svg viewBox="0 0 600 340" className="route-lines">
            <path
              d="M-10 275 C80 275 50 80 170 80 S240 240 335 240 360 70 610 70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="170" cy="80" r="8" />
            <circle cx="335" cy="240" r="8" />
          </svg>
          <div className="flow-center">
            <span className="tiny-label">CALI, COLOMBIA</span>
            <strong>
              {a.patterns}
              <br />
              <em>{a.motion}</em>
            </strong>
            <span className="art-caption">{a.data}</span>
          </div>
        </>
      ) : slug === "marketing-ai" ? (
        <>
          <div className="ai-window">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <Sparkles size={26} strokeWidth={1} />
            <strong>
              {a.help}
              <br />
              <em>{a.possibility}</em>
            </strong>
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
            <span className="art-caption">Streamlit × AI</span>
          </div>
        </>
      ) : slug === "transunion-payments" ? (
        <>
          <div className="payment-card">
            <span className="tiny-label">{a.connected}</span>
            <strong>
              {a.detail}
              <br />
              <em>{a.counts}</em>
            </strong>
            <span className="payment-line">
              Java <ArrowUpRight size={26} /> REST API
            </span>
          </div>
        </>
      ) : (
        <>
          <Activity className="activity-mark" size={140} strokeWidth={0.5} />
          <div className="flow-center">
            <span className="tiny-label">{a.performance}</span>
            <strong>
              {a.looking}
              <br />
              <em>{a.surface}</em>
            </strong>
          </div>
        </>
      )}
    </div>
  );
}
