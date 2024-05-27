package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.repository.ProduitRepository;
import com.vita.vitamiel.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.UUID;

@RestController
@RequestMapping("/produit")
public class ProduitController {

    @Autowired
    private final ProduitRepository produitRepository;

    public ProduitController(ProduitRepository produitRepository){
        this.produitRepository = produitRepository;
    }

    @Autowired
   private  ProduitService produitService;

    @GetMapping("/produits")
        public LinkedList<Produit> getAllProduit() throws Exception{

        LinkedList<Produit> produits = produitRepository.findAllProduit();

        return produits;

    }

    @PostMapping("/produitpost")
    public Produit createProduit(@RequestBody Produit produit){
        Produit createProduit = produitService.createProduit(produit);

        return createProduit;
    }



    @DeleteMapping("/{produitid}")
    public String deleteProduit(@PathVariable UUID produitid) throws Exception{

        produitService.deleteProduit(produitid);

        return "le produit a été supprimé";
    }

}
