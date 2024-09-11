package com.vitamiel.service;

import com.vitamiel.domain.Membre;
import com.vitamiel.repository.MembreRepository;
import com.vitamiel.service.dto.MembreDTO;
import com.vitamiel.service.mapper.MembreMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.vitamiel.domain.Membre}.
 */
@Service
@Transactional
public class MembreService {

    private static final Logger LOG = LoggerFactory.getLogger(MembreService.class);

    private final MembreRepository membreRepository;

    private final MembreMapper membreMapper;

    public MembreService(MembreRepository membreRepository, MembreMapper membreMapper) {
        this.membreRepository = membreRepository;
        this.membreMapper = membreMapper;
    }

    /**
     * Save a membre.
     *
     * @param membreDTO the entity to save.
     * @return the persisted entity.
     */
    public MembreDTO save(MembreDTO membreDTO) {
        LOG.debug("Request to save Membre : {}", membreDTO);
        Membre membre = membreMapper.toEntity(membreDTO);
        membre = membreRepository.save(membre);
        return membreMapper.toDto(membre);
    }

    /**
     * Update a membre.
     *
     * @param membreDTO the entity to save.
     * @return the persisted entity.
     */
    public MembreDTO update(MembreDTO membreDTO) {
        LOG.debug("Request to update Membre : {}", membreDTO);
        Membre membre = membreMapper.toEntity(membreDTO);
        membre = membreRepository.save(membre);
        return membreMapper.toDto(membre);
    }

    /**
     * Get all the membres with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<MembreDTO> findAllWithEagerRelationships(Pageable pageable) {
        return membreRepository.findAllWithEagerRelationships(pageable).map(membreMapper::toDto);
    }

    /**
     * Get one membre by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MembreDTO> findOne(Long id) {
        LOG.debug("Request to get Membre : {}", id);
        return membreRepository.findOneWithEagerRelationships(id).map(membreMapper::toDto);
    }

    /**
     * Delete the membre by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Membre : {}", id);
        membreRepository.deleteById(id);
    }

    public Optional<MembreDTO> findByUserId(final Long userId)
    {
        return membreRepository.findByUser_Id(userId).map(membreMapper::toDto);
    }
}
