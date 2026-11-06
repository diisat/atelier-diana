# Atelier visual direction

The approved concept is L’Atelier de Diana: an editorial portfolio with a small optional playground. The main experience gives immediate access to projects, background and contact details. Interaction supports the story without making visitors play a game to reach professional information.

## Foundations

| Token      | Value     | Use                                      |
| ---------- | --------- | ---------------------------------------- |
| Paper      | `#FAF7F2` | Page background                          |
| Burgundy   | `#6E263D` | Headings, actions and accents            |
| Lilac      | `#C8B6E2` | Decorative accents                       |
| Pale lilac | `#EEE6F3` | Selected project and playground surfaces |
| Ink        | `#27232A` | Body text                                |
| Muted      | `#71656B` | Secondary copy                           |

Cormorant Garamond provides the editorial headings. DM Sans is used for interface text and paragraphs. Both are self-hosted through Fontsource packages. The portrait uses the supplied photograph with a CSS crop. Project art is built from original HTML, CSS and SVG, not borrowed client imagery.

## Interactions and accessibility

- Locale links preserve the current route.
- Work filters use buttons with pressed-state semantics.
- The country selector works through both map markers and text buttons.
- The hobby garden supports click, touch and keyboard arrows, plus a jump button.
- Reduced-motion preferences suppress animated movement.
- Visible focus, a skip link, descriptive link labels and semantic headings support keyboard and screen-reader navigation.
- Mobile navigation uses an explicit menu button with expanded state.

## Figma handoff

`figma-build.js` contains the editable five-screen construction source prepared for the Figma MCP Plugin API: desktop home, profile, project study, playground and mobile home. It uses palette variables, layout containers, reusable project cards and button instances, plus prototype connections. It is a construction script, not a `.fig` file or a standalone browser script.

The initially connected Figma account was not the account Diana wanted. Its created portfolio nodes were removed after her correction. Do not use that discarded file as the design deliverable. Re-run the construction only in the verified Diana account, upload the portrait to its returned photo targets, then inspect the complete screens and fix any layout defects before publishing a Figma link.

The running website is the verified visual reference for the final handoff. The Figma construction remains subject to that final comparison.

## Inspiration

- [Gianluca Boccia](https://www.gianlucaboccia.me/): personal storytelling and restrained navigation.
- [Zesiger](https://zesiger.net/): optional exploration alongside direct access to content.

The portfolio has its own typography, colours, layout, illustrations and interactions.
