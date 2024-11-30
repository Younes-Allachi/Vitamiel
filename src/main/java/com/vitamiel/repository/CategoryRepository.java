package com.vitamiel.repository;

import com.vitamiel.domain.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {

    Optional<Category> findByNameEn(String nameEn);  
    Optional<Category> findByNameEs(String nameEs); 
    Optional<Category> findByNameFr(String nameFr); 
    Optional<Category> findByNameNl(String nameNl); 
}
