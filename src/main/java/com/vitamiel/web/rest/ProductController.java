package com.vitamiel.web.rest;

import com.vitamiel.domain.Product;
import com.vitamiel.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add a new product with an image upload and category ID
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("origin") String origin,
            @RequestParam("weightKg") double weightKg,
            @RequestParam("price") double price,
            @RequestParam("stockQuantity") int stockQuantity,
            @RequestParam("categoryId") String categoryId, // Accept categoryId here
            @RequestParam("image") MultipartFile imageFile) {
        try {
            Product savedProduct = productService.addProduct(name, description, origin, weightKg, price, stockQuantity,
                    categoryId, imageFile);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Handle file upload error
        }
    }

    // Update an existing product (image is optional here)
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") String id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("origin") String origin,
            @RequestParam("weightKg") double weightKg,
            @RequestParam("price") double price,
            @RequestParam("stockQuantity") int stockQuantity,
            @RequestParam("categoryId") String categoryId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) { // image is now optional
        try {
            Product productDetails = new Product();
            productDetails.setName(name);
            productDetails.setDescription(description);
            productDetails.setOrigin(origin);
            productDetails.setWeightKg(weightKg);
            productDetails.setPrice(price);
            productDetails.setStockQuantity(stockQuantity);
            productDetails.setCategoryId(categoryId);

            // Call the service method and pass the image file if available
            Product updatedProduct = productService.updateProduct(id, productDetails, imageFile);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        }  catch (Exception e) {  // Catch a generic exception (or RuntimeException if you prefer)
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // Handle error gracefully
        }
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") String id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Get a product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") String id) {
        Product product = productService.getProductById(id)
                .orElseThrow(() -> new NoSuchElementException("Product with ID " + id + " not found"));

        return new ResponseEntity<>(product, HttpStatus.OK);
    }
}
