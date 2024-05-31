package com.vita.vitamiel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "personne")
public class Personne {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nom;
    private String prenom;
    private String pays;

    public void vueProduits(){

    }
    public void vueDetailsProduits(){

    }
    public void ajouterPanier(Produit produit){

    }
    public void passerCommande(){

    }
    public void gererProfil(){

    }
    public void gererProduits(){

    }

}
