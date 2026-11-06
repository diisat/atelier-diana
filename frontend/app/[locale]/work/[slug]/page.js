import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { messages } from "../../../../lib/messages";
import { getProject } from "../../../../lib/api";
import ProjectArt from "../../../../components/ProjectArt";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const p = await getProject(locale, slug);
  return { title: p?.title || "Project" };
}
export default async function Project({ params }) {
  const { locale, slug } = await params;
  const p = await getProject(locale, slug);
  if (!p) notFound();
  const t = messages[locale].work;
  return (
    <main id="main" className="wrap case-study">
      <Link href={`/${locale}/work`} className="text-link back-link">
        <ArrowLeft size={16} />
        {t.back}
      </Link>
      <section className="case-intro">
        <p className="eyebrow">
          {t[p.category]} / {p.organization}
        </p>
        <h1>{p.title}</h1>
        <p className="case-summary">{p.summary}</p>
        <div className="case-meta">
          <span>
            <small>{t.context}</small>
            {p.organization}
          </span>
          <span>
            <small>{t.period}</small>
            {p.status === "in-progress" ? t["in-progress"] : p.period}
          </span>
          <span className="case-status">{t[p.status]}</span>
        </div>
      </section>
      <figure>
        <ProjectArt locale={locale} slug={slug} large />
        <figcaption>{t.illustration}</figcaption>
      </figure>
      <div className="case-body">
        <aside>
          <p className="eyebrow">{t.tools}</p>
          <ul>
            {p.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </aside>
        <div>
          {["challenge", "contribution", "outcome", "learning"].map(
            (key, index) => (
              <section className="case-section" key={key}>
                <span className="eyebrow">0{index + 1}</span>
                <h2>{t[key]}</h2>
                <p>{p[key]}</p>
              </section>
            ),
          )}
        </div>
      </div>
      <Link href={`/${locale}/work`} className="button primary">
        {t.next}
        <ArrowUpRight size={18} />
      </Link>
    </main>
  );
}
