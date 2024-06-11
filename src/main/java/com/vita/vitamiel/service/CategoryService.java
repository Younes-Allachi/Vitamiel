package com.vita.vitamiel.service;

import com.vita.vitamiel.model.Category;
import com.vita.vitamiel.model.Job;

import java.util.UUID;

public interface CategoryService {

    public Category createcategory(Category category);
    public Category findCategoryById(UUID id) throws Exception;
    public Category updateCategory(Category category, UUID id) throws Exception;

    public void deleteCategory(UUID id) throws Exception;
}
