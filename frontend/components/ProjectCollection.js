"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import ProjectArt from "./ProjectArt";

export function ProjectCard({ project, locale, index = 0 }) {
  const t = useTranslations("work");
  return (
    <article className="project-card">
      <Link
        href={`/${locale}/work/${project.slug}`}
        className="project-image"
        aria-label={`${t("read")}: ${project.title}`}
      >
        <ProjectArt locale={locale} slug={project.slug} />
        <span className="project-arrow">
          <ArrowUpRight size={24} />
        </span>
        {project.status !== "completed" && (
          <span className="status-badge">{t(project.status)}</span>
        )}
      </Link>
      <div className="project-meta">
        <span>
          {String(index + 1).padStart(2, "0")} / {t(project.category)}
        </span>
        <span>{project.organization.split(" · ")[0]}</span>
      </div>
      <h3>
        <Link href={`/${locale}/work/${project.slug}`}>{project.title}</Link>
      </h3>
      <p>{project.summary}</p>
    </article>
  );
}
export default function ProjectCollection({ projects, locale }) {
  const [filter, setFilter] = useState("all");
  const t = useTranslations("work");
  const filtered = projects.filter(
    (p) => filter === "all" || p.category === filter,
  );
  return (
    <>
      <div className="filter-row" role="group" aria-label={t("eyebrow")}>
        {["all", "engineering", "data", "ai"].map((key) => (
          <button
            key={key}
            className={filter === key ? "active" : ""}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {t(key)}
            {key === "all" && <small>{projects.length}</small>}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
        ))}
        {!filtered.length && <p>{t("empty")}</p>}
      </div>
    </>
  );
}
