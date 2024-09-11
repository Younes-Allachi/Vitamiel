package com.vitamiel.web.rest;

import com.vitamiel.repository.MembreRepository;
import com.vitamiel.service.MembreService;
import com.vitamiel.service.dto.MembreDTO;
import com.vitamiel.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.vitamiel.domain.Membre}.
 */
@RestController
@RequestMapping("/api/membres")
public class MembreResource {

    private static final Logger LOG = LoggerFactory.getLogger(MembreResource.class);

    private static final String ENTITY_NAME = "membre";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MembreService membreService;

    private final MembreRepository membreRepository;

    public MembreResource(MembreService membreService, MembreRepository membreRepository) {
        this.membreService = membreService;
        this.membreRepository = membreRepository;
    }

    /**
     * {@code POST  /membres} : Create a new membre.
     *
     * @param membreDTO the membreDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new membreDTO, or with status {@code 400 (Bad Request)} if the membre has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<MembreDTO> createMembre(@RequestBody MembreDTO membreDTO) throws URISyntaxException {
        LOG.debug("REST request to save Membre : {}", membreDTO);
        if (membreDTO.getId() != null) {
            throw new BadRequestAlertException("A new membre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        membreDTO = membreService.save(membreDTO);
        return ResponseEntity.created(new URI("/api/membres/" + membreDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, membreDTO.getId().toString()))
            .body(membreDTO);
    }

    /**
     * {@code PUT  /membres/:id} : Updates an existing membre.
     *
     * @param id the id of the membreDTO to save.
     * @param membreDTO the membreDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated membreDTO,
     * or with status {@code 400 (Bad Request)} if the membreDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the membreDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MembreDTO> updateMembre(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MembreDTO membreDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update Membre : {}, {}", id, membreDTO);
        if (membreDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, membreDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!membreRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        membreDTO = membreService.update(membreDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, membreDTO.getId().toString()))
            .body(membreDTO);
    }
    /**
     * {@code GET  /membres/:id} : get the "id" membre.
     *
     * @param userId the id of the membreDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the membreDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<MembreDTO> getMembre(@PathVariable("userId") Long userId) {
        LOG.debug("REST request to get Membre : {}", userId);
        Optional<MembreDTO> membreDTO = membreService.findByUserId(userId);
        return ResponseUtil.wrapOrNotFound(membreDTO);
    }

    /**
     * {@code DELETE  /membres/:id} : delete the "id" membre.
     *
     * @param id the id of the membreDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMembre(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Membre : {}", id);
        membreService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
