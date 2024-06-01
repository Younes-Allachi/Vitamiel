package com.vita.vitamiel.repository;

import com.vita.vitamiel.model.Personne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.LinkedList;
import java.util.UUID;

public interface PersonneRepository extends JpaRepository<Personne, UUID> {

    @Query("SELECT p FROM Personne p")
    LinkedList<Personne> findAllPersonne();
}
