package com.dianatorres.atelier.project;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService service;
    public ProjectController(ProjectService service) { this.service = service; }

    @GetMapping
    public List<Project> list(@RequestParam(defaultValue="en") String locale,
                              @RequestParam(defaultValue="all") String category) {
        return service.list(locale, category);
    }

    @GetMapping("/{slug}")
    public Project get(@PathVariable String slug, @RequestParam(defaultValue="en") String locale) {
        return service.get(locale, slug);
    }
}
