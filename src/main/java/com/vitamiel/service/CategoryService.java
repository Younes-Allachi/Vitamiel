package com.vitamiel.service;

import com.vitamiel.domain.Category;
import com.vitamiel.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Add a new category
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Update an existing category
    public Category updateCategory(String categoryId, Category categoryDetails) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NoSuchElementException("Category with ID " + categoryId + " not found"));

        category.setName(categoryDetails.getName()); // Update the name or other fields if needed
        return categoryRepository.save(category);
    }

    // Delete a category
    public void deleteCategory(String categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get category by ID
    public Optional<Category> getCategoryById(String categoryId) {
        return categoryRepository.findById(categoryId);
    }

    // Get category by name
    public Optional<Category> getCategoryByName(String categoryName) {
        return categoryRepository.findByName(categoryName);
    }
}
