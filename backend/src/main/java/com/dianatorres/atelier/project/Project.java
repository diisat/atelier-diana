package com.dianatorres.atelier.project;

import java.util.List;

public record Project(String slug, String category, String status, String organization, String period,
                      String title, String summary, String challenge, String contribution,
                      String outcome, String learning, List<String> technologies) { }
