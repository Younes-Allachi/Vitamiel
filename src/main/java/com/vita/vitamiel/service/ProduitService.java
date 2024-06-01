package com.vita.vitamiel.service;

import com.vita.vitamiel.model.Personne;
import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.model.Stock;

import java.util.UUID;

public interface ProduitService {

    public Produit createProduit(Produit produit, Stock stock, Personne personne);
    public Produit findProduitById(UUID id) throws Exception;
    public Produit updateProduit(Produit produit, UUID id) throws Exception;

    public void deleteProduit(UUID id) throws Exception;
}
