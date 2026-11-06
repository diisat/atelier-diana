# L’Atelier de Diana

A personal portfolio for Diana Torres: software engineering, international experience and a creative direction in progress. The interface and case studies are available in English, French and Spanish.

[Figma design](https://www.figma.com/design/cObMo6HmqOecANy1XJoIxN) · [Continuous integration](https://github.com/diisat/atelier-diana/actions) · [Verification record](docs/verification.md)

## What is included

- An editorial home page with burgundy, ivory and lilac colours.
- Five case studies, with category filters and individual project pages.
- An interactive international journey distinguishing mission locations from remote work.
- A profile page, a cover letter in three languages and the supplied French PDF CV.
- A placeholder for a future introduction video.
- A keyboard- and touch-accessible hobby game with progress and restart controls.
- A Java API serving translated project content from a relational database.
- Five editable Figma views, with portable SVG sources in `docs/design/`.

The marketing AI assistant is explicitly marked **in progress**. Project illustrations are original visual interpretations, not screenshots of client products. The academic M.I.O. project credits the collaboration with Juan David Bolaños.

## Architecture

The backend is a **modular monolith with layers and the Repository pattern**. The React frontend is a separate application in the same repository.

```text
Browser
  └── Next.js / React frontend (JavaScript, server rendering)
        └── Java / Spring Boot REST API
              └── ProjectService (application rules)
                    └── ProjectRepository (interface)
                          └── JdbcProjectRepository
                                └── PostgreSQL + Flyway migrations
```

Node.js runs the frontend framework. All portfolio business API logic is in Java. H2 is available only as an explicit local development/test option; PostgreSQL is the deployment database.

See [architecture](docs/architecture.md), [API](docs/api.md), [content guide](docs/content-guide.md) and [design](docs/design.md).

## Run locally

Requirements: Java 21 or later, Node.js 22 or later, and npm. The Maven wrapper downloads its pinned Maven distribution on first use.

Start the backend in one terminal:

```sh
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Start the frontend in another terminal:

```sh
cd frontend
npm ci
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en). The API is at `http://localhost:8080/api/projects?locale=en`.

The `dev` profile uses an in-memory H2 database in PostgreSQL compatibility mode, loaded by the same migrations. Restarting this profile restores the seed data. It does not require a local PostgreSQL installation.

## Run with PostgreSQL and Docker

Requires Docker with Compose. Copy `.env.example` to `.env` and replace the example database password, then run:

```sh
docker compose up --build
```

Open [http://localhost:3000/en](http://localhost:3000/en). PostgreSQL and the Java API stay on the internal Compose network. The PostgreSQL data volume persists between restarts.

For a native PostgreSQL installation, start Java without the dev profile and set `DATABASE_URL` to a **JDBC** URL such as `jdbc:postgresql://localhost:5432/atelier`, plus `DATABASE_USER` and `DATABASE_PASSWORD`.

## Checks

```sh
cd backend
./mvnw verify
```

```sh
cd frontend
npm test
npm run build
```

The browser test suite expects the Java API to be running:

```sh
cd frontend
npx playwright install chromium
npm run test:e2e
```

CI runs Java integration tests against PostgreSQL, validates all translation keys, builds the frontend and checks the key browser journeys. See [verification notes](docs/verification.md) for checks actually performed during creation.

## Update the portfolio

UI, biography, journey and cover-letter translations live in `frontend/lib/messages.js`. Project content lives in `content/projects.json`, and published database changes are managed through Flyway migrations. Follow the [content guide](docs/content-guide.md) to add a project safely after the first deployment.

To add a video, place the file in `frontend/public/files/` and set `INTRO_VIDEO_URL=/files/introduction.mp4` in `frontend/.env.local`. Add translated WebVTT captions at `intro-en.vtt`, `intro-fr.vtt` and `intro-es.vtt` in the same directory, then restart the frontend. Without a configured video, the page deliberately shows a coming-soon message.

The downloadable CV is the supplied French document. The language selector translates the site, not the PDF. Replace or add CV files deliberately when new versions are ready.

## Project structure

```text
backend/             Java API, SQL migrations and integration tests
frontend/            React pages, components, translations and browser tests
content/             Editable project source content
docs/                Architecture, API, design and maintenance guides
scripts/             Content preparation helpers
.github/workflows/   Continuous integration
compose.yaml         Frontend, Java API and PostgreSQL
```

## Ownership

Copyright © 2026 Diana Torres. All rights reserved unless another license is explicitly added. A public repository does not grant reuse rights to the portrait, CV or personal content. Third-party dependencies retain their own licenses.
