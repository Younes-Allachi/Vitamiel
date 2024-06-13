package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Category;
import com.vita.vitamiel.model.Job;
import com.vita.vitamiel.repository.CategoryRepository;
import com.vita.vitamiel.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.UUID;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository){

        this.categoryRepository = categoryRepository;
    }

    @Autowired
    CategoryService categoryService;

    @GetMapping("/cat")
    public LinkedList<Category> getAllJob() throws Exception{

        LinkedList<Category> categories = categoryRepository.findAllCategory();

        return categories;
    }

    @PostMapping("/createcategory")
    public Category createCategory(@RequestBody Category category){

        Category createdCategory = categoryService.createcategory(category);

        return  createdCategory;
    }

    @DeleteMapping("/{jobid}")
    public String deletecategory(@PathVariable UUID categoryId) throws Exception{

        categoryService.deleteCategory(categoryId);

        return "la catégory a bien été effacé";
    }



}
