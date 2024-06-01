package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Personne;
import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.model.Stock;
import com.vita.vitamiel.repository.ProduitRepository;
import com.vita.vitamiel.service.PersonneService;
import com.vita.vitamiel.service.ProduitService;
import com.vita.vitamiel.service.StockService;
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

    @Autowired
    private StockService stockService;

    @Autowired
    private PersonneService personneService;

    @GetMapping("/produits")
        public LinkedList<Produit> getAllProduit() throws Exception{

        LinkedList<Produit> produits = produitRepository.findAllProduit();

        return produits;

    }

    @PostMapping("/produitpost/{id}/{personneid}")
    public Produit createProduit(@RequestBody Produit produit, @PathVariable  UUID id, @PathVariable UUID personneid) throws Exception{
        Stock stock = stockService.findStockById(id);
        Personne personne = personneService.findPersonne(personneid);
        Produit createProduit = produitService.createProduit(produit, stock, personne);

        return createProduit;
    }

    @PutMapping("/{id}")
    public Produit updatedProduit(@RequestBody Produit produit, @PathVariable UUID id) throws Exception {

        Produit updatedProduit = produitService.updateProduit(produit,id);

        return updatedProduit;
    }

    @DeleteMapping("/{produitid}")
    public String deleteProduit(@PathVariable UUID produitid) throws Exception{

        produitService.deleteProduit(produitid);

        return "le produit a été supprimé";
    }

}
