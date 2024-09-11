package com.vitamiel.web.rest;

import static com.vitamiel.domain.MembreAsserts.*;
import static com.vitamiel.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vitamiel.IntegrationTest;
import com.vitamiel.domain.Membre;
import com.vitamiel.repository.MembreRepository;
import com.vitamiel.repository.UserRepository;
import com.vitamiel.service.MembreService;
import com.vitamiel.service.dto.MembreDTO;
import com.vitamiel.service.mapper.MembreMapper;
import jakarta.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link MembreResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class MembreResourceIT {

    private static final String DEFAULT_LIVRAISON_ADRESS = "AAAAAAAAAA";
    private static final String UPDATED_LIVRAISON_ADRESS = "BBBBBBBBBB";

    private static final String DEFAULT_COMMUNICATION_PREFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_COMMUNICATION_PREFERENCE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/membres";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private MembreRepository membreRepository;

    @Autowired
    private UserRepository userRepository;

    @Mock
    private MembreRepository membreRepositoryMock;

    @Autowired
    private MembreMapper membreMapper;

    @Mock
    private MembreService membreServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMembreMockMvc;

    private Membre membre;

    private Membre insertedMembre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membre createEntity() {
        return new Membre().livraisonAdress(DEFAULT_LIVRAISON_ADRESS).communicationPreference(DEFAULT_COMMUNICATION_PREFERENCE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membre createUpdatedEntity() {
        return new Membre().livraisonAdress(UPDATED_LIVRAISON_ADRESS).communicationPreference(UPDATED_COMMUNICATION_PREFERENCE);
    }

    @BeforeEach
    public void initTest() {
        membre = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedMembre != null) {
            membreRepository.delete(insertedMembre);
            insertedMembre = null;
        }
    }

    @Test
    @Transactional
    void createMembre() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Membre
        MembreDTO membreDTO = membreMapper.toDto(membre);
        var returnedMembreDTO = om.readValue(
            restMembreMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(membreDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            MembreDTO.class
        );

        // Validate the Membre in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedMembre = membreMapper.toEntity(returnedMembreDTO);
        assertMembreUpdatableFieldsEquals(returnedMembre, getPersistedMembre(returnedMembre));

        insertedMembre = returnedMembre;
    }

    @Test
    @Transactional
    void createMembreWithExistingId() throws Exception {
        // Create the Membre with an existing ID
        membre.setId(1L);
        MembreDTO membreDTO = membreMapper.toDto(membre);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMembreMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(membreDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMembres() throws Exception {
        // Initialize the database
        insertedMembre = membreRepository.saveAndFlush(membre);

        // Get all the membreList
        restMembreMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(membre.getId().intValue())))
            .andExpect(jsonPath("$.[*].livraisonAdress").value(hasItem(DEFAULT_LIVRAISON_ADRESS)))
            .andExpect(jsonPath("$.[*].communicationPreference").value(hasItem(DEFAULT_COMMUNICATION_PREFERENCE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMembresWithEagerRelationshipsIsEnabled() throws Exception {
        when(membreServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMembreMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(membreServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMembresWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(membreServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restMembreMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(membreRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getMembre() throws Exception {
        // Initialize the database
        insertedMembre = membreRepository.saveAndFlush(membre);

        // Get the membre
        restMembreMockMvc
            .perform(get(ENTITY_API_URL_ID, membre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(membre.getId().intValue()))
            .andExpect(jsonPath("$.livraisonAdress").value(DEFAULT_LIVRAISON_ADRESS))
            .andExpect(jsonPath("$.communicationPreference").value(DEFAULT_COMMUNICATION_PREFERENCE));
    }

    @Test
    @Transactional
    void getNonExistingMembre() throws Exception {
        // Get the membre
        restMembreMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingMembre() throws Exception {
        // Initialize the database
        insertedMembre = membreRepository.saveAndFlush(membre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the membre
        Membre updatedMembre = membreRepository.findById(membre.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedMembre are not directly saved in db
        em.detach(updatedMembre);
        updatedMembre.livraisonAdress(UPDATED_LIVRAISON_ADRESS).communicationPreference(UPDATED_COMMUNICATION_PREFERENCE);
        MembreDTO membreDTO = membreMapper.toDto(updatedMembre);

        restMembreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, membreDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(membreDTO))
            )
            .andExpect(status().isOk());

        // Validate the Membre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedMembreToMatchAllProperties(updatedMembre);
    }

    @Test
    @Transactional
    void putNonExistingMembre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        membre.setId(longCount.incrementAndGet());

        // Create the Membre
        MembreDTO membreDTO = membreMapper.toDto(membre);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMembreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, membreDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(membreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMembre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        membre.setId(longCount.incrementAndGet());

        // Create the Membre
        MembreDTO membreDTO = membreMapper.toDto(membre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMembreMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(membreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMembre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        membre.setId(longCount.incrementAndGet());

        // Create the Membre
        MembreDTO membreDTO = membreMapper.toDto(membre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMembreMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(membreDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Membre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMembreWithPatch() throws Exception {
        // Initialize the database
        insertedMembre = membreRepository.saveAndFlush(membre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the membre using partial update
        Membre partialUpdatedMembre = new Membre();
        partialUpdatedMembre.setId(membre.getId());

        partialUpdatedMembre.communicationPreference(UPDATED_COMMUNICATION_PREFERENCE);

        restMembreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMembre.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMembre))
            )
            .andExpect(status().isOk());

        // Validate the Membre in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMembreUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedMembre, membre), getPersistedMembre(membre));
    }

    @Test
    @Transactional
    void fullUpdateMembreWithPatch() throws Exception {
        // Initialize the database
        insertedMembre = membreRepository.saveAndFlush(membre);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the membre using partial update
        Membre partialUpdatedMembre = new Membre();
        partialUpdatedMembre.setId(membre.getId());

        partialUpdatedMembre.livraisonAdress(UPDATED_LIVRAISON_ADRESS).communicationPreference(UPDATED_COMMUNICATION_PREFERENCE);

        restMembreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMembre.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMembre))
            )
            .andExpect(status().isOk());

        // Validate the Membre in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMembreUpdatableFieldsEquals(partialUpdatedMembre, getPersistedMembre(partialUpdatedMembre));
    }

    @Test
    @Transactional
    void patchNonExistingMembre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        membre.setId(longCount.incrementAndGet());

        // Create the Membre
        MembreDTO membreDTO = membreMapper.toDto(membre);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMembreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, membreDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(membreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMembre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        membre.setId(longCount.incrementAndGet());

        // Create the Membre
        MembreDTO membreDTO = membreMapper.toDto(membre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMembreMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(membreDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Membre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMembre() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        membre.setId(longCount.incrementAndGet());

        // Create the Membre
        MembreDTO membreDTO = membreMapper.toDto(membre);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMembreMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(membreDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Membre in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMembre() throws Exception {
        // Initialize the database
        insertedMembre = membreRepository.saveAndFlush(membre);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the membre
        restMembreMockMvc
            .perform(delete(ENTITY_API_URL_ID, membre.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return membreRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Membre getPersistedMembre(Membre membre) {
        return membreRepository.findById(membre.getId()).orElseThrow();
    }

    protected void assertPersistedMembreToMatchAllProperties(Membre expectedMembre) {
        assertMembreAllPropertiesEquals(expectedMembre, getPersistedMembre(expectedMembre));
    }

    protected void assertPersistedMembreToMatchUpdatableProperties(Membre expectedMembre) {
        assertMembreAllUpdatablePropertiesEquals(expectedMembre, getPersistedMembre(expectedMembre));
    }
}
