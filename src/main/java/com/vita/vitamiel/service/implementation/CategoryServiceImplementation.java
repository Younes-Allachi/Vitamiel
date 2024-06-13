package com.vita.vitamiel.service.implementation;

import com.vita.vitamiel.model.Category;
import com.vita.vitamiel.repository.CategoryRepository;
import com.vita.vitamiel.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryServiceImplementation implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category createcategory(Category category) {

        Category category1 = new Category();

        category1.setNom(category.getNom());
        category1.setProduits(category.getProduits());

        return  categoryRepository.save(category1);
    }

    @Override
    public Category findCategoryById(UUID id) throws Exception {

        Optional<Category> opt = categoryRepository.findById(id);

        if(opt.isPresent()){

            return opt.get();
        }
        throw new  Exception("le job avec id suivant n'a pas été trouvé " +id);

    }

    @Override
    public Category updateCategory(Category category, UUID id) throws Exception {

        Category oldcategory = findCategoryById(id);

        if(category.getNom() !=null){
            oldcategory.setNom(category.getNom());
        }

        if(category.getProduits() !=null){
            oldcategory.setProduits(category.getProduits());
        }

        return categoryRepository.save(oldcategory);
    }

    @Override
    public void deleteCategory(UUID id) throws Exception {

        findCategoryById(id);

        categoryRepository.deleteById(id);

    }
}
