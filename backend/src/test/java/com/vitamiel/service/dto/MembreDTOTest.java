package com.vitamiel.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.vitamiel.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MembreDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MembreDTO.class);
        MembreDTO membreDTO1 = new MembreDTO();
        membreDTO1.setId(1L);
        MembreDTO membreDTO2 = new MembreDTO();
        assertThat(membreDTO1).isNotEqualTo(membreDTO2);
        membreDTO2.setId(membreDTO1.getId());
        assertThat(membreDTO1).isEqualTo(membreDTO2);
        membreDTO2.setId(2L);
        assertThat(membreDTO1).isNotEqualTo(membreDTO2);
        membreDTO1.setId(null);
        assertThat(membreDTO1).isNotEqualTo(membreDTO2);
    }
}
