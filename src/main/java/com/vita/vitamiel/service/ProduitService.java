package com.vita.vitamiel.service;

import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.model.Stock;

import java.util.UUID;

public interface ProduitService {

    public Produit createProduit(Produit produit);
    public Produit findProduitById(UUID id) throws Exception;
    public Produit updateProduit(Produit produit, UUID id) throws Exception;

    public void deleteProduit(UUID id) throws Exception;
}
