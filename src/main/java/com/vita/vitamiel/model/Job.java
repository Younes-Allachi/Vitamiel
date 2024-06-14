package com.vita.vitamiel.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Job")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID      id;

    private String    title;

    private String    lieu;

    private String    email;

    private String    telephone;

    private String    pays;

    private String    ville;

    private LocalDate debut;

    private LocalDate fin;

    private String type;

    private String contrat;

    private String langue;

    private String education;

    private String secteur;

    private Boolean statut;

   }
