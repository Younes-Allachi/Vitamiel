package com.vita.vitamiel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Stock")

public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nom;
    private int quantite;


}
