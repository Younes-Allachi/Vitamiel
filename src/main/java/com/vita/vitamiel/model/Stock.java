package com.vita.vitamiel.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "Stock")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String nom;
    double prix;
    int quantite;


}
