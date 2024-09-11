package com.vitamiel.domain;

import static com.vitamiel.domain.MembreTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.vitamiel.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MembreTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Membre.class);
        Membre membre1 = getMembreSample1();
        Membre membre2 = new Membre();
        assertThat(membre1).isNotEqualTo(membre2);

        membre2.setId(membre1.getId());
        assertThat(membre1).isEqualTo(membre2);

        membre2 = getMembreSample2();
        assertThat(membre1).isNotEqualTo(membre2);
    }
}
