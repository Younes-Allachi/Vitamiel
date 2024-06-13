package com.vita.vitamiel.controller;

import com.vita.vitamiel.model.Category;
import com.vita.vitamiel.repository.CategoryRepository;
import com.vita.vitamiel.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;

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



}
