package com.vita.vitamiel.service.implementation;

import com.vita.vitamiel.model.Personne;
import com.vita.vitamiel.service.PersonneService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PersonneServiceImplementation implements PersonneService {
    @Override
    public Personne createPersonne(Personne personne) {
        return null;
    }

    @Override
    public Personne findPersonne(UUID id) throws Exception {
        return null;
    }

    @Override
    public Personne updatePersonne(Personne personne, UUID id) throws Exception {
        return null;
    }

    @Override
    public void deletePersonne(UUID id) throws Exception {

    }
}
