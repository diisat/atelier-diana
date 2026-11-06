import test from "node:test";
import assert from "node:assert/strict";
import { messages, locales } from "../lib/messages.js";
import { readFile } from "node:fs/promises";
const projects = JSON.parse(
  await readFile(
    new URL("../../content/projects.json", import.meta.url),
    "utf8",
  ),
);
function leaves(object, prefix = "") {
  return Object.entries(object)
    .flatMap(([key, value]) =>
      typeof value === "object"
        ? leaves(value, `${prefix}${key}.`)
        : [`${prefix}${key}`],
    )
    .sort();
}
test("every visible interface key is translated into all three languages", () => {
  for (const locale of locales)
    assert.deepEqual(leaves(messages[locale]), leaves(messages.en));
});
test("all projects have complete three-language case studies", () => {
  for (const p of projects) {
    assert.match(p.slug, /^[a-z0-9-]+$/);
    for (const locale of locales) {
      assert.deepEqual(
        Object.keys(p.translations[locale]).sort(),
        Object.keys(p.translations.en).sort(),
      );
      for (const value of Object.values(p.translations[locale]))
        assert.ok(value.length > 15);
    }
  }
});
test("the unfinished assistant is not represented as completed", () => {
  assert.equal(
    projects.find((p) => p.slug === "marketing-ai").status,
    "in-progress",
  );
});
