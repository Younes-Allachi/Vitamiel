package com.vita.vitamiel.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Data
@Getter
@Setter
@Table(name = "vitamiel")

public class Vitamiel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String nom;
    private String adresse;
    private String email;
    private String telephone;
    private String pays;
}
