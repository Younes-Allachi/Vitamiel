package com.vita.vitamiel.service;

import com.vita.vitamiel.model.Personne;
import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.model.Stock;

import java.util.UUID;

public interface PersonneService {

    public Personne createPersonne(Personne personne);
    public Personne findPersonne(UUID id) throws Exception;
    public Personne updatePersonne(Personne personne, UUID id) throws Exception;

    public void deletePersonne(UUID id) throws Exception;
}
