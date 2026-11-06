package com.dianatorres.atelier.project;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {
    private static final Set<String> LOCALES = Set.of("en", "fr", "es");
    private static final Set<String> CATEGORIES = Set.of("all", "engineering", "data", "ai");
    private final ProjectRepository repository;
    public ProjectService(ProjectRepository repository) { this.repository = repository; }

    public List<Project> list(String locale, String category) {
        if (!LOCALES.contains(locale) || !CATEGORIES.contains(category))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported locale or category");
        return repository.findAll(locale).stream()
            .filter(p -> category.equals("all") || p.category().equals(category)).toList();
    }

    public Project get(String locale, String slug) {
        return list(locale, "all").stream().filter(p -> p.slug().equals(slug)).findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }
}
