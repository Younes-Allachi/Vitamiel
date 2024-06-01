package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Personne;
import com.vita.vitamiel.repository.PersonneRepository;
import com.vita.vitamiel.service.PersonneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

@RestController
@RequestMapping("/personne")
public class PersonneController {

    @Autowired
    private final PersonneRepository personneRepository;

    public PersonneController(PersonneRepository personneRepository){
        this.personneRepository = personneRepository;
    }

    @Autowired
    PersonneService personneService;

    @GetMapping("/personnes")
    public LinkedList<Personne> getAllPersonne() throws Exception{

        LinkedList<Personne> personnes = personneRepository.findAllPersonne();

        return personnes;

    }
}
