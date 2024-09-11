package com.vitamiel.service.mapper;

import static com.vitamiel.domain.MembreAsserts.*;
import static com.vitamiel.domain.MembreTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MembreMapperTest {

    private MembreMapper membreMapper;

    @BeforeEach
    void setUp() {
        membreMapper = new MembreMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getMembreSample1();
        var actual = membreMapper.toEntity(membreMapper.toDto(expected));
        assertMembreAllPropertiesEquals(expected, actual);
    }
}
