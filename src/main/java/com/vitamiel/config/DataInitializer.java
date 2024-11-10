package com.vitamiel.config;

import com.vitamiel.domain.Category;
import com.vitamiel.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    public DataInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        List<Category> categories = Arrays.asList(
                new Category(null, 1, "Miel"),
                new Category(null, 2, "Gelée"),
                new Category(null, 3, "Pollen"),
                new Category(null, 4, "Propolis"),
                new Category(null, 5, "Maison"),
                new Category(null, 6, "Denrées"),
                new Category(null, 7, "Soins")
        );

        categoryRepository.saveAll(categories);
        System.out.println("Categories inserted.");
    }
}
