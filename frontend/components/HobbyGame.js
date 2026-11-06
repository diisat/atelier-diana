"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Palette,
  Languages,
  CircleDot,
  Footprints,
  Sparkles,
} from "lucide-react";
const hobbies = ["ballet", "tennis", "painting", "languages"];
const icons = [Footprints, CircleDot, Palette, Languages];
export default function HobbyGame() {
  const t = useTranslations("play");
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState([0]);
  const [jump, setJump] = useState(0);
  function go(index) {
    const next = (index + hobbies.length) % hobbies.length;
    setCurrent(next);
    setVisited((old) => (old.includes(next) ? old : [...old, next]));
    setJump((old) => old + 1);
  }
  function onKey(event) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      go(current + (event.key === "ArrowRight" ? 1 : -1));
    } else if (event.code === "Space") {
      event.preventDefault();
      setJump((old) => old + 1);
    }
  }
  return (
    <section className="game">
      <p className="game-instructions" id="game-instructions">
        {t("instructions")}
      </p>
      <div
        className="hobby-garden"
        tabIndex={0}
        role="group"
        aria-label={t("garden")}
        aria-describedby="game-instructions"
        onKeyDown={onKey}
      >
        <div className="garden-ripples" />
        <div className="hobby-islands">
          {hobbies.map((h, i) => {
            const Icon = icons[i];
            return (
              <button
                key={h}
                className={`hobby-island island-${i} ${current === i ? "active" : ""}`}
                aria-pressed={current === i}
                onClick={() => go(i)}
              >
                <span className="island-number">0{i + 1}</span>
                <Icon size={32} strokeWidth={1.2} />
                <span>{t(h)}</span>
                {visited.includes(i) && (
                  <span className="visited-dot" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
        <div
          className="jumper-track"
          style={{ "--island": current }}
          aria-hidden="true"
        >
          <span className="jumper" key={jump}>
            ✳
          </span>
          <span className="jumper-shadow" />
        </div>
        <span className="garden-label" aria-hidden="true">
          {t("label")}
        </span>
      </div>
      <div className="game-controls">
        <div>
          <button
            className="icon-button"
            onClick={() => go(current - 1)}
            aria-label={t(hobbies[(current + 3) % 4])}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="button secondary"
            onClick={() => setJump((old) => old + 1)}
          >
            {t("jump")}
            <Sparkles size={16} />
          </button>
          <button
            className="icon-button"
            onClick={() => go(current + 1)}
            aria-label={t(hobbies[(current + 1) % 4])}
          >
            <ArrowRight size={18} />
          </button>
        </div>
        <span>
          {visited.length} / 4 {t("visited")}
        </span>
      </div>
      <div className="hobby-story" aria-live="polite">
        <p className="eyebrow">0{current + 1} / DIANA</p>
        <h2>{t(hobbies[current])}</h2>
        <p>{t(`${hobbies[current]}Text`)}</p>
        {visited.length === 4 && (
          <p className="completion-message">{t("complete")}</p>
        )}
      </div>
      <button
        className="text-link restart"
        onClick={() => {
          setCurrent(0);
          setVisited([0]);
          setJump((old) => old + 1);
        }}
      >
        <RotateCcw size={15} />
        {t("restart")}
      </button>
    </section>
  );
}
