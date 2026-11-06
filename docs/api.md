# Portfolio API

Base URL for local development: `http://localhost:8080`.

| Method | Path                   | Parameters | Result                      |
| ------ | ---------------------- | ---------- | --------------------------- | ------------------ | ---------------------- | ---- | --- | --------------------- |
| GET    | `/api/projects`        | `locale=en | fr                          | es`, `category=all | engineering            | data | ai` | Ordered project array |
| GET    | `/api/projects/{slug}` | `locale=en | fr                          | es`                | One translated project |
| GET    | `/actuator/health`     | None       | Service and database health |

Defaults are `locale=en` and `category=all`. An unsupported locale/category returns 400. An unknown project returns 404. Public writes are not supported.

```json
{
  "slug": "marketing-ai",
  "category": "ai",
  "status": "in-progress",
  "organization": "Diana Torres",
  "period": "In progress",
  "title": "A thoughtful marketing assistant",
  "summary": "An AI marketing assistant taking shape with Streamlit.",
  "challenge": "...",
  "contribution": "...",
  "outcome": "...",
  "learning": "...",
  "technologies": ["Python", "Streamlit", "Generative AI"]
}
```

The frontend translates status labels. The display period for an unfinished project uses that translated status instead of the seed’s English metadata.
