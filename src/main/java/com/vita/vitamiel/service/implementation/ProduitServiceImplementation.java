package com.vita.vitamiel.service.implementation;

import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.model.Stock;
import com.vita.vitamiel.repository.ProduitRepository;
import com.vita.vitamiel.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ProduitServiceImplementation implements ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Override
    public Produit createProduit(Produit produit, Stock stock){

        Produit createProduit = new Produit();

        createProduit.setNom(produit.getNom());
        createProduit.setDescription(produit.getDescription());
        createProduit.setOrigine(produit.getOrigine());
        createProduit.setPoids(produit.getPoids());
        createProduit.setPrix(produit.getPrix());
        createProduit.setStock(stock);

        return produitRepository.save(createProduit);

    }

    @Override
    public Produit findProduitById(UUID id) throws Exception {

        Optional<Produit> opt = produitRepository.findById(id);

        if(opt.isPresent()){
            return opt.get();
        }
        throw new  Exception("le produit avec id suivant n'a pas été trouvé " +id);

    }

    @Override
    public Produit updateProduit(Produit produit, UUID id) throws Exception {

        Produit oldproduit = findProduitById(id);

        if(produit.getNom() !=null){
            oldproduit.setNom(produit.getNom());
        }

        if(produit.getDescription() !=null){
            oldproduit.setDescription(produit.getDescription());
        }

        if(produit.getOrigine() !=null){
            oldproduit.setOrigine(produit.getOrigine());
        }

        if(produit.getPoids() != 0){
            oldproduit.setPoids(produit.getPoids());
        }

        if(produit.getPrix() !=0){
            oldproduit.setPrix(produit.getPrix());
        }

        return produitRepository.save(oldproduit);
    }

    @Override
    public void deleteProduit(UUID id) throws Exception {

        findProduitById(id);

        produitRepository.deleteById(id);

    }
}
