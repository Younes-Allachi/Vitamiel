package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Personne;
import com.vita.vitamiel.model.Produit;
import com.vita.vitamiel.repository.PersonneRepository;
import com.vita.vitamiel.service.PersonneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.UUID;

@RestController
@RequestMapping("/personne")
public class PersonneController {

    @Autowired
    private final PersonneRepository personneRepository;

    public PersonneController(PersonneRepository personneRepository){
        this.personneRepository = personneRepository;
    }

    @Autowired
    private PersonneService personneService;

    @GetMapping("/personnes")
    public LinkedList<Personne> getAllPersonne() throws Exception{

        LinkedList<Personne> personnes = personneRepository.findAllPersonne();

        return personnes;

    }

    @PostMapping("/personnecreate")
    public Personne createPersonne(@RequestBody Personne personne) throws Exception{

        Personne personnecreated = personneService.createPersonne(personne);

        return  personnecreated;
    }

    @PutMapping("/{id}")
    public Personne updatedPersonne(@RequestBody Personne personne, @PathVariable UUID id) throws Exception {

        Personne updatePersonne = personneService.updatePersonne(personne,id);

        return updatePersonne;
    }

    @DeleteMapping("/{personneid}")
    public String deletePersonne(@PathVariable UUID personneid) throws Exception{

        personneService.deletePersonne(personneid);

        return "suppression effectué";
    }



}
