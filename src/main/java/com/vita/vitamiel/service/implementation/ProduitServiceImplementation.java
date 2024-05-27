package com.vita.vitamiel.service.implementation;

import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.repository.ProduitRepository;
import com.vita.vitamiel.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProduitServiceImplementation implements ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Override
    public Produit createProduit(Produit produit){

        Produit createProduit = new Produit();

        createProduit.setNom(produit.getNom());
        createProduit.setDescription(produit.getDescription());
        createProduit.setOrigine(produit.getOrigine());
        createProduit.setPoids(produit.getPoids());
        createProduit.setPrix(produit.getPrix());

        return produitRepository.save(createProduit);

    }

    @Override
    public Produit findProduitById(UUID id) throws Exception {
        return null;
    }

    @Override
    public Produit updateProduit(Produit produit, UUID id) throws Exception {
        return null;
    }

    @Override
    public void deleteProduit(UUID id) throws Exception {

    }
}
