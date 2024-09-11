package com.vitamiel.domain;

import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A Membre.
 */
@Entity
@Table(name = "membre")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Membre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "livraison_adress")
    private String livraisonAdress;

    @Column(name = "communication_preference")
    private String communicationPreference;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Membre id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLivraisonAdress() {
        return this.livraisonAdress;
    }

    public Membre livraisonAdress(String livraisonAdress) {
        this.setLivraisonAdress(livraisonAdress);
        return this;
    }

    public void setLivraisonAdress(String livraisonAdress) {
        this.livraisonAdress = livraisonAdress;
    }

    public String getCommunicationPreference() {
        return this.communicationPreference;
    }

    public Membre communicationPreference(String communicationPreference) {
        this.setCommunicationPreference(communicationPreference);
        return this;
    }

    public void setCommunicationPreference(String communicationPreference) {
        this.communicationPreference = communicationPreference;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Membre user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Membre)) {
            return false;
        }
        return getId() != null && getId().equals(((Membre) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Membre{" +
            "id=" + getId() +
            ", livraisonAdress='" + getLivraisonAdress() + "'" +
            ", communicationPreference='" + getCommunicationPreference() + "'" +
            "}";
    }
}
