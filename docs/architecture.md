# Architecture and decisions

## Context

The portfolio introduces Diana’s software engineering background and an emerging creative practice. It needs readable content, multilingual routes, interactive navigation and a manageable way to add projects. Java is the backend language because it reflects Diana’s expertise.

## Pattern and boundaries

The backend is one deployable Spring Boot application, organised by feature. Within the `project` module, `ProjectController` handles HTTP, `ProjectService` validates locale and category, `ProjectRepository` defines data access, and `JdbcProjectRepository` implements the database queries. SQL parameters are bound by `JdbcTemplate`.

The frontend uses React and Next.js in JavaScript. Server components load project data from Java. Client components handle filters, the country selector, navigation and the hobby game. The browser never receives database credentials. `API_URL` is a server-only configuration value.

Java remains the business backend. Next.js requires a Node.js runtime for rendering and serving the interface; it does not duplicate the Java business API.

## Persistence

PostgreSQL is the deployment database. `project` stores stable identifiers, category, status, context and technologies. `project_translation` stores the six case-study fields per locale, with a composite primary key and a foreign key to the project. Flyway applies versioned migrations.

H2 is an explicit `dev` or `test` convenience, not a silent production fallback. CI uses real PostgreSQL through `TEST_DATABASE_URL`. Biography and interface messages are versioned with the frontend because their volume and update frequency do not justify an administration system.

## API scope

The public API is read-only. Content changes go through source control and database migrations. There is no anonymous write endpoint, account system or contact-message database. Contact links open the visitor’s mail application or LinkedIn.

## Language handling

Routes use `/en`, `/fr` and `/es`. The selector replaces the locale segment while preserving the route. The browser and assistive technology receive the matching HTML language. Project translations are resolved by the Java API; UI text is handled with next-intl. Unsupported API locales return HTTP 400, and missing projects return HTTP 404.

## Deployment

Compose runs PostgreSQL, Java and Next.js. Only the frontend port is exposed by default. Secrets are environment variables, excluded from version control. For an internet deployment, place the frontend behind HTTPS, supply durable database storage and backups, and set the Java service URL in `API_URL`.

The development preview is local. A public GitHub repository is source publication, not a deployed public website. GitHub Pages cannot execute this Java backend.

## Deliberate limits

This first version has no content editor UI, public video upload, user tracking or AI chatbot. The marketing assistant is a case study in progress, not a hosted assistant feature. New projects can be added with the documented migration workflow.
