import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const projects = JSON.parse(
  await readFile(new URL("content/projects.json", root), "utf8"),
);
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const slugs = new Set();
const fields = [
  "title",
  "summary",
  "challenge",
  "contribution",
  "outcome",
  "learning",
];
const statements = [
  "-- Generated from content/projects.json. Do not edit an applied migration.",
];
for (const [index, project] of projects.entries()) {
  if (slugs.has(project.slug))
    throw new Error(`Duplicate project ${project.slug}`);
  slugs.add(project.slug);
  statements.push(
    `INSERT INTO project VALUES (${[project.slug, project.category, project.status, project.organization, project.period, project.technologies.join("|")].map(quote).join(", ")}, ${index + 1});`,
  );
  for (const locale of ["en", "fr", "es"]) {
    const translation = project.translations[locale];
    if (!translation || fields.some((field) => !translation[field]))
      throw new Error(`Incomplete ${locale}: ${project.slug}`);
    statements.push(
      `INSERT INTO project_translation VALUES (${[project.slug, locale, ...fields.map((field) => translation[field])].map(quote).join(", ")});`,
    );
  }
}
const target = new URL(
  "backend/src/main/resources/db/migration/V2__seed_projects.sql",
  root,
);
await writeFile(target, statements.join("\n\n") + "\n");
console.log(
  `Generated ${projects.length} projects in three languages: ${fileURLToPath(target)}`,
);
