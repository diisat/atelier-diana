import "server-only";

const base = process.env.API_URL || "http://127.0.0.1:8080";
export async function getProjects(locale) {
  const response = await fetch(
    `${base}/api/projects?locale=${encodeURIComponent(locale)}`,
    { cache: "no-store", signal: AbortSignal.timeout(8000) },
  );
  if (!response.ok) throw new Error("Unable to load project collection");
  return response.json();
}
export async function getProject(locale, slug) {
  const response = await fetch(
    `${base}/api/projects/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
    { cache: "no-store", signal: AbortSignal.timeout(8000) },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Unable to load project");
  return response.json();
}
