import Link from "next/link";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";
import { messages } from "../../lib/messages";
import { getProjects } from "../../lib/api";
import { ProjectCard } from "../../components/ProjectCollection";
import Journey from "../../components/Journey";

export const dynamic = "force-dynamic";
export default async function Home({ params }) {
  const { locale } = await params;
  const m = messages[locale] || messages.en;
  const t = m.home;
  const projects = await getProjects(locale);
  return (
    <main id="main">
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>
            <span>{t.line1}</span>
            <span>{t.line2}</span>
            <em>{t.line3}</em>
          </h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <Link href={`/${locale}/work`} className="button primary">
              {t.explore}
              <ArrowUpRight size={18} />
            </Link>
            <Link href={`/${locale}/about`} className="text-link">
              {t.meet}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="portrait-composition">
          <span className="portrait-orbit" />
          <span className="portrait-star" aria-hidden="true">
            ✳
          </span>
          <div className="portrait-frame">
            <img
              src="/images/diana.jpeg"
              alt="Diana Torres"
              width="589"
              height="589"
              fetchPriority="high"
            />
          </div>
          <div className="portrait-note">
            <span className="handwritten">
              {t.note1}
              <br />
              {t.note2}
            </span>
            <span className="portrait-caption">{t.caption}</span>
          </div>
        </div>
        <a href="#selected-work" className="scroll-hint">
          <ArrowDown size={15} />
          {t.scroll}
        </a>
      </section>
      <div className="world-strip wrap">
        <span className="eyebrow">{t.world}</span>
        <div>
          {["colombia", "usa", "france", "switzerland"].map((c) => (
            <span key={c}>{m.journey[c]}</span>
          ))}
        </div>
        <span className="strip-star" aria-hidden="true">
          ✳
        </span>
      </div>
      <section id="selected-work" className="selected-work wrap section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.selected}</p>
            <h2>{t.workTitle}</h2>
          </div>
          <Link className="text-link" href={`/${locale}/work`}>
            {t.all}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="section-intro">{t.workIntro}</p>
        <div className="project-grid">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
          ))}
        </div>
        <Link href={`/${locale}/work/marketing-ai`} className="workbench">
          <div className="bench-symbol">
            <Sparkles size={38} strokeWidth={1} />
          </div>
          <div>
            <p className="eyebrow">
              {t.bench}
              <span className="status-dot" />
              {m.work["in-progress"]}
            </p>
            <h3>{t.benchTitle}</h3>
            <p>{t.benchText}</p>
          </div>
          <span className="bench-link">
            {t.benchLink}
            <ArrowUpRight size={24} />
          </span>
        </Link>
      </section>
      <Journey />
      <section className="play-teaser wrap">
        <div className="teaser-copy">
          <p className="eyebrow">{t.beyond}</p>
          <h2>{t.playTitle}</h2>
          <p>{t.playText}</p>
          <Link className="button primary" href={`/${locale}/playground`}>
            {t.playLink}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="teaser-art" aria-hidden="true">
          <span className="tennis-ball" />
          <span className="paint-swoosh" />
          <span className="art-flower">✳</span>
          <span className="language-note">
            hola.
            <br />
            <em>bonjour.</em>
            <br />
            hello.
          </span>
        </div>
      </section>
    </main>
  );
}
