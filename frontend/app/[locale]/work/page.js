import { messages } from "../../../lib/messages";
import { getProjects } from "../../../lib/api";
import ProjectCollection from "../../../components/ProjectCollection";
export const dynamic = "force-dynamic";
export default async function Work({ params }) {
  const { locale } = await params;
  const t = messages[locale].work;
  const projects = await getProjects(locale);
  return (
    <main id="main" className="wrap">
      <section className="page-intro">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </section>
      <ProjectCollection projects={projects} locale={locale} />
      <section className="next-chapter">
        <span aria-hidden="true">✳</span>
        <h2>{t.nextTitle}</h2>
        <p>{t.nextText}</p>
      </section>
    </main>
  );
}
