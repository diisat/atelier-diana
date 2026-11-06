# Maintaining the content

## Edit an existing page

Update all three matching keys in `frontend/lib/messages.js`. `npm test` checks key parity. The journey records mission dates independently of employer periods, so overlapping dates remain visible without inventing a chronology.

## Add a project

1. Add an entry to `content/projects.json` with a unique lowercase slug, category, status, organisation, period and technologies.
2. Write all six case-study fields in English, French and Spanish: title, summary, challenge, contribution, outcome and learning.
3. Choose `completed`, `in-progress` or `exploring` honestly. Record your contribution within a team and cite any measured result in the private evidence you keep for the project.
4. Create a new versioned migration, for example `V3__add_new_project.sql`, inserting the project and its three translations. Follow the existing SQL structure. Escape apostrophes as two apostrophes, or generate values with the helper’s quoting function.
5. Add a new visual treatment to `ProjectArt.js` if appropriate. Keep illustrations identified as interpretations rather than client screenshots.
6. Run Java tests, frontend content tests, a build and the browser checks. Review the three language versions.

`node scripts/generate-seed.mjs` regenerates **V2 for a fresh, unpublished database only**. Never change a migration already applied to a persistent database. Use a new migration for production additions or edits.

## Video and CV

The introduction video is intentionally absent until Diana provides one. `INTRO_VIDEO_URL` enables the player. Supply caption files alongside it. The French PDF CV is copied unchanged from the supplied source and remains labelled French in every language.

The CV’s original dates differ from Diana’s subsequent corrections. The portfolio uses her corrections for Assura and Covéa. Updating the PDF itself is a separate editorial action; do not imply that changing the site updates the downloadable document.

## Content provenance

Sources: the supplied French CV, technical experience dossier, degree-project manuscript and Diana’s explicit corrections in the project conversation. The old portfolio projects were not used.

Confirmed corrections: Assura January–August 2021; Covéa August–December 2021 with Java, Selenium, Maven, Jenkins and Page Object Model; the marketing AI assistant is in progress with Streamlit.

Several source dates overlap. The site presents missions by country rather than inventing a sequential employment timeline. Confirm employer-level chronology before generating a replacement CV.

The USA entry refers to TransUnion’s international context; the work location is explicitly Cali, Colombia. Assura is a Swiss mission, not a claim of residence. The M.I.O. work is academic and collaborative, with no unverified claim of production deployment.

No client source code, private technical dossier, internal screenshots or manuscript file is included in the repository. The public material consists of portfolio summaries, the supplied CV and portrait.
