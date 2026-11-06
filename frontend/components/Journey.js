"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, ArrowUpRight } from "lucide-react";
const countries = ["colombia", "usa", "france", "switzerland"];
const positions = {
  colombia: [28, 71],
  usa: [22, 33],
  france: [67, 28],
  switzerland: [74, 37],
};
export default function Journey() {
  const t = useTranslations("journey");
  const [country, setCountry] = useState("france");
  return (
    <section id="journey" className="journey section-space wrap">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h2>{t("title")}</h2>
      <p className="section-intro">{t("intro")}</p>
      <div className="journey-content">
        <div className="journey-map">
          <svg viewBox="0 0 560 370" aria-hidden="true">
            <path
              className="map-continent"
              d="M48 68 88 44 142 51 184 83 170 116 144 144 139 176 108 162 83 120 48 108Z M145 191 193 204 210 240 191 281 167 329 153 287 134 243Z M331 65 362 51 386 71 405 58 449 73 498 102 481 145 442 153 409 133 374 141 342 116Z M331 150 373 140 405 167 397 215 371 254 343 239 321 194Z"
            />
            <path
              className="map-route"
              d="M123 122 Q190 5 375 104 M157 263 Q234 91 414 137 M123 122 Q70 192 157 263 M375 104 L414 137"
            />
          </svg>
          {countries.map((c) => (
            <button
              key={c}
              className={`map-pin ${country === c ? "selected" : ""}`}
              style={{
                left: `${positions[c][0]}%`,
                top: `${positions[c][1]}%`,
              }}
              onClick={() => setCountry(c)}
              aria-pressed={country === c}
              aria-label={t(c)}
            >
              <span />
              <b>{t(c)}</b>
            </button>
          ))}
        </div>
        <div className="journey-details">
          <div className="country-tabs" role="group" aria-label={t("title")}>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={country === c ? "active" : ""}
                aria-pressed={country === c}
              >
                {t(c)}
              </button>
            ))}
          </div>
          <div key={country} className="journey-story" aria-live="polite">
            <p className="eyebrow">
              <MapPin size={13} />
              {t(country)}
            </p>
            <h3>{t(`${country}Title`)}</h3>
            <p>{t(`${country}Text`)}</p>
            <ul>
              {t(`${country}Detail`)
                .split("\n")
                .map((s) => (
                  <li key={s}>{s}</li>
                ))}
            </ul>
          </div>
          <p className="journey-hint">{t("hint")}</p>
        </div>
      </div>
    </section>
  );
}
