package com.vita.vitamiel.service.implementation;

import com.vita.vitamiel.model.Category;
import com.vita.vitamiel.repository.CategoryRepository;
import com.vita.vitamiel.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CategoryServiceImplementation implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createcategory(Category category) {
        return null;
    }

    @Override
    public Category findCategoryById(UUID id) throws Exception {
        return null;
    }

    @Override
    public Category updateCategory(Category category, UUID id) throws Exception {
        return null;
    }

    @Override
    public void deleteCategory(UUID id) throws Exception {

        findCategoryById(id);

        categoryRepository.deleteById(id);

    }
}
