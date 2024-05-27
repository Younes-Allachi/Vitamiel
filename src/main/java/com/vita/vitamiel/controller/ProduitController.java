package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.repository.ProduitRepository;
import com.vita.vitamiel.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

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

}
