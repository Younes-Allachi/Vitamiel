package com.vita.vitamiel.repository;

import com.vita.vitamiel.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.LinkedList;
import java.util.UUID;

public interface ProduitRepository extends JpaRepository<Produit, UUID> {

    @Query("SELECT p FROM Produit p")
    LinkedList<Produit> findAllProduit();
}
