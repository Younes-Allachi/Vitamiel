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
@Table(name = "produit")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nom;
    private String description;
    private String origine;
    private double poids;
    private double prix;

    @ManyToOne
    private Stock stock;



    public void obtenirDetailsProduit(){

    }
}
