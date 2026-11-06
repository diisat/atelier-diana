import {
  ArrowDownToLine,
  Video,
  ScanSearch,
  Globe2,
  Heart,
} from "lucide-react";
import { messages } from "../../../lib/messages";
export default async function About({ params }) {
  const { locale } = await params;
  const t = messages[locale].about;
  const video = process.env.INTRO_VIDEO_URL;
  return (
    <main id="main" className="wrap">
      <section className="page-intro about-intro">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </section>
      <section className="about-person">
        <img
          src="/images/diana.jpeg"
          width="589"
          height="589"
          alt="Diana Torres"
          className="about-portrait"
        />
        <div>
          <blockquote>“{t.quote}”</blockquote>
          <p>{t.education}</p>
          <p>{t.languages}</p>
          <a
            className="button primary"
            href="/files/diana-torres-cv-fr.pdf"
            download="Diana-Torres-CV-FR.pdf"
          >
            {t.cv}
            <ArrowDownToLine size={18} />
          </a>
          <small className="file-hint">{t.cvLanguage}</small>
        </div>
      </section>
      <section className="skills-section">
        <p className="eyebrow">{t.skills}</p>
        <div className="skills-grid">
          {[
            ["analysis", ScanSearch],
            ["collaboration", Globe2],
            ["craft", Heart],
          ].map(([key, Icon]) => (
            <article key={key}>
              <Icon size={25} strokeWidth={1} />
              <h3>{t[key]}</h3>
              <p>{t[`${key}Text`]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="video-section">
        {video ? (
          <video
            controls
            preload="metadata"
            aria-label={t.videoLabel}
            src={video}
            poster="/images/diana.jpeg"
          >
            <track
              kind="captions"
              srcLang={locale}
              label={locale.toUpperCase()}
              src={`/files/intro-${locale}.vtt`}
            />
          </video>
        ) : (
          <>
            <Video size={34} strokeWidth={1} />
            <p className="eyebrow">{t.videoSoon}</p>
            <h2>{t.videoTitle}</h2>
            <p>{t.videoText}</p>
          </>
        )}
      </section>
      <section className="letter-section">
        <div>
          <p className="eyebrow">{t.letterLabel}</p>
          <h2>{t.letterTitle}</h2>
        </div>
        <article className="letter-paper">
          {t.letter.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <span className="letter-signature" aria-hidden="true">
            Diana
          </span>
        </article>
      </section>
    </main>
  );
}
