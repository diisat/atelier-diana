CREATE TABLE project (
    slug VARCHAR(100) PRIMARY KEY,
    category VARCHAR(30) NOT NULL CHECK (category IN ('engineering', 'data', 'ai')),
    status VARCHAR(30) NOT NULL CHECK (status IN ('completed', 'in-progress', 'exploring')),
    organization VARCHAR(160) NOT NULL,
    period VARCHAR(80) NOT NULL,
    technologies VARCHAR(500) NOT NULL,
    display_order INTEGER NOT NULL UNIQUE
);
CREATE TABLE project_translation (
    project_slug VARCHAR(100) NOT NULL REFERENCES project(slug) ON DELETE CASCADE,
    locale VARCHAR(2) NOT NULL CHECK (locale IN ('en', 'fr', 'es')),
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    challenge TEXT NOT NULL,
    contribution TEXT NOT NULL,
    outcome TEXT NOT NULL,
    learning TEXT NOT NULL,
    PRIMARY KEY (project_slug, locale)
);
