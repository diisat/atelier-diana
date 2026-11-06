package com.dianatorres.atelier.project;

import java.util.List;

public interface ProjectRepository {
    List<Project> findAll(String locale);
}
