package com.vitamiel.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.vitamiel.domain.Membre} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MembreDTO implements Serializable {

    private Long id;

    private String livraisonAdress;

    private String communicationPreference;

    private AdminUserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLivraisonAdress() {
        return livraisonAdress;
    }

    public void setLivraisonAdress(String livraisonAdress) {
        this.livraisonAdress = livraisonAdress;
    }

    public String getCommunicationPreference() {
        return communicationPreference;
    }

    public void setCommunicationPreference(String communicationPreference) {
        this.communicationPreference = communicationPreference;
    }

    public AdminUserDTO getUser() {
        return user;
    }

    public void setUser(AdminUserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MembreDTO)) {
            return false;
        }

        MembreDTO membreDTO = (MembreDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, membreDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MembreDTO{" +
            "id=" + getId() +
            ", livraisonAdress='" + getLivraisonAdress() + "'" +
            ", communicationPreference='" + getCommunicationPreference() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
