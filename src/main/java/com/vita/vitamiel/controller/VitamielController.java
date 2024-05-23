package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Vitamiel;
import com.vita.vitamiel.repository.VitamielRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/vita")
public class VitamielController {

    @Autowired
    private final VitamielRepository vitamielRepository;

    public VitamielController(VitamielRepository vitamielRepository) {
        this.vitamielRepository = vitamielRepository;
    }

    @GetMapping("/vitamiel")
    public ResponseEntity<Vitamiel> getVitamiel(){
        UUID id = UUID.fromString("04ece6ce-2690-4152-a5c9-09d40d5891b7");

        Vitamiel vitamiel = vitamielRepository.findVitamielById(id);
        if (vitamiel != null) {
            return ResponseEntity.ok(vitamiel);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {return ResponseEntity.ok("endpoint okey");}


}
