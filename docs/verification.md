# Verification record

Verified on 6 November 2026 during the initial implementation.

## Completed locally

- Java API: six Spring Boot integration tests passed, covering translated project lists and details, category filtering, invalid locales, missing projects and rejected writes. Flyway applied both migrations successfully to H2 in PostgreSQL compatibility mode.
- Frontend content: three Node tests passed, checking complete EN/FR/ES interface keys, complete translated case studies and the assistant's in-progress status.
- Next.js production build completed successfully.
- Browser checks on the running frontend and Java API: project filtering, project detail navigation, EN/FR/ES switching with route and journey anchor preserved, the corrected Assura dates, CV link and video placeholder, keyboard completion and reset of the hobby game, and mobile menu navigation.
- Mobile layout at 390 × 844: Spanish home and profile content fit the viewport without horizontal overflow. Desktop home checked at 1440 × 1000.
- The PDF endpoint returned HTTP 200 and `application/pdf`.
- No browser console errors were recorded during these checks.

Local tooling: Java 23 compiling for Java 21, Maven 3.9.11, Node 25. The deployment configuration targets Java 21 and Node 22.

## Further checks configured

The GitHub Actions workflow runs the API integration tests against real PostgreSQL 16, builds the frontend under Node 22 and executes three Playwright browser journeys. These CI checks must be observed passing before claiming the PostgreSQL and CI environments are verified.

Docker Compose is configured but was not run locally because Docker is not installed. A live introduction video and translated caption files remain to be supplied. The website is runnable locally; publishing the source repository does not deploy a public website.
