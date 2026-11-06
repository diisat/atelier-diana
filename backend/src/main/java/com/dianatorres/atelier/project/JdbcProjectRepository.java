package com.dianatorres.atelier.project;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.Arrays;
import java.util.List;

@Repository
public class JdbcProjectRepository implements ProjectRepository {
    private final JdbcTemplate jdbc;
    public JdbcProjectRepository(JdbcTemplate jdbc) { this.jdbc = jdbc; }

    public List<Project> findAll(String locale) {
        return jdbc.query("""
            SELECT p.*, t.title, t.summary, t.challenge, t.contribution, t.outcome, t.learning
            FROM project p JOIN project_translation t ON p.slug = t.project_slug
            WHERE t.locale = ? ORDER BY p.display_order
            """, (rs, row) -> new Project(rs.getString("slug"), rs.getString("category"),
            rs.getString("status"), rs.getString("organization"), rs.getString("period"),
            rs.getString("title"), rs.getString("summary"), rs.getString("challenge"),
            rs.getString("contribution"), rs.getString("outcome"), rs.getString("learning"),
            Arrays.asList(rs.getString("technologies").split("\\|"))), locale);
    }
}
