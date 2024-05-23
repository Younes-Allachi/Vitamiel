package com.vita.vitamiel.repository;

import com.vita.vitamiel.model.Vitamiel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VitamielRepository extends JpaRepository<Vitamiel, UUID> {

    Vitamiel findVitamielById(UUID id);

}
