package com.dianatorres.atelier.project;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProjectApiTest {
    @Autowired MockMvc mvc;

    @Test void servesSeededProjectsInEveryLanguage() throws Exception {
        for (String locale : new String[]{"en", "fr", "es"}) {
            mvc.perform(get("/api/projects").param("locale", locale))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].slug").value("engie-automation"))
                .andExpect(jsonPath("$[0].title", not(emptyString())))
                .andExpect(jsonPath("$[0].technologies", hasItem("Java")));
        }
    }

    @Test void returnsTheRequestedTranslation() throws Exception {
        mvc.perform(get("/api/projects/mio-predictive-models").param("locale", "fr"))
            .andExpect(status().isOk()).andExpect(jsonPath("$.title").value("Comprendre le mouvement"));
    }

    @Test void filtersWithoutLosingTheProjectStatus() throws Exception {
        mvc.perform(get("/api/projects").param("category", "ai").param("locale", "es"))
            .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].status").value("in-progress"));
    }

    @Test void rejectsUnsupportedLocaleAndCategory() throws Exception {
        mvc.perform(get("/api/projects").param("locale", "de")).andExpect(status().isBadRequest());
        mvc.perform(get("/api/projects").param("category", "unknown")).andExpect(status().isBadRequest());
    }

    @Test void missingProjectReturns404() throws Exception {
        mvc.perform(get("/api/projects/does-not-exist")).andExpect(status().isNotFound());
    }

    @Test void portfolioApiHasNoPublicWriteEndpoint() throws Exception {
        mvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post("/api/projects"))
            .andExpect(status().isMethodNotAllowed());
    }
}
