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

The [Figma design file](https://www.figma.com/design/cObMo6HmqOecANy1XJoIxN) belongs to Diana’s Figma workspace. It contains five views under `Atelier / Screens`: desktop home, profile, project study, playground and mobile home.

The Figma connector became unavailable after the account reconnection. The final views were therefore imported through the Figma editor as SVG layers generated from the running site's observed layout. Text, shapes, vector illustrations and portrait masks remain editable. Cormorant Garamond and DM Sans were mapped to their Figma font families; the hero and complete board overview were visually checked.

These are composed visual mockups. They do not include a Figma component library, responsive auto-layout rules or wired prototype interactions. The running website provides the working interactions and remains the reference for responsive behaviour and translations.

Portable SVGs and their captured layout data are in `docs/design/`. Run `node scripts/design-svg.mjs` from the repository root to regenerate the SVGs from that saved data. The data is a snapshot; it does not update automatically when the website changes. Small typography and decorative differences between SVG import and browser rendering are expected.

## Inspiration

- [Gianluca Boccia](https://www.gianlucaboccia.me/): personal storytelling and restrained navigation.
- [Zesiger](https://zesiger.net/): optional exploration alongside direct access to content.

The portfolio has its own typography, colours, layout, illustrations and interactions.
