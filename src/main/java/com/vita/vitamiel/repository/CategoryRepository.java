package com.vita.vitamiel.repository;

import com.vita.vitamiel.model.Category;
import com.vita.vitamiel.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.LinkedList;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

    @Query("SELECT c FROM Category c")
    LinkedList<Category> findAllCategory();
}
