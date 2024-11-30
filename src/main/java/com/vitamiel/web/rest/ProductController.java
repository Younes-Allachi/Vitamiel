package com.vitamiel.web.rest;

import com.vitamiel.domain.Product;
import com.vitamiel.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Add a new product with multilingual fields and an image upload
    @PostMapping
    public ResponseEntity<Product> addProduct(
            @RequestParam("enName") String enName,
            @RequestParam("esName") String esName,
            @RequestParam("frName") String frName,
            @RequestParam("nlName") String nlName,
            @RequestParam("enDescription") String enDescription,
            @RequestParam("esDescription") String esDescription,
            @RequestParam("frDescription") String frDescription,
            @RequestParam("nlDescription") String nlDescription,
            @RequestParam("origin") String origin,
            @RequestParam("weightKg") double weightKg,
            @RequestParam("price") double price,
            @RequestParam("stockQuantity") int stockQuantity,
            @RequestParam("categoryId") String categoryId, // Accept categoryId here
            @RequestParam("image") MultipartFile imageFile) {
        try {
            // Call service method with multilingual parameters
            Product savedProduct = productService.addProduct(
                    enName, esName, frName, nlName, 
                    enDescription, esDescription, frDescription, nlDescription,
                    origin, weightKg, price, stockQuantity, categoryId, imageFile);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Handle file upload error
        }
    }

    // Update an existing product with multilingual fields and optional image upload
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable("id") String id,
            @RequestParam("enName") String enName,
            @RequestParam("esName") String esName,
            @RequestParam("frName") String frName,
            @RequestParam("nlName") String nlName,
            @RequestParam("enDescription") String enDescription,
            @RequestParam("esDescription") String esDescription,
            @RequestParam("frDescription") String frDescription,
            @RequestParam("nlDescription") String nlDescription,
            @RequestParam("origin") String origin,
            @RequestParam("weightKg") double weightKg,
            @RequestParam("price") double price,
            @RequestParam("stockQuantity") int stockQuantity,
            @RequestParam("categoryId") String categoryId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) { // image is now optional
        try {
            // Create a product object and set the updated fields
            Product productDetails = new Product();
            productDetails.setEnName(enName);
            productDetails.setEsName(esName);
            productDetails.setFrName(frName);
            productDetails.setNlName(nlName);
            productDetails.setEnDescription(enDescription);
            productDetails.setEsDescription(esDescription);
            productDetails.setFrDescription(frDescription);
            productDetails.setNlDescription(nlDescription);
            productDetails.setOrigin(origin);
            productDetails.setWeightKg(weightKg);
            productDetails.setPrice(price);
            productDetails.setStockQuantity(stockQuantity);
            productDetails.setCategoryId(categoryId);

         // Check if image is deleted (imageFile is null) and remove the old image if present
         if (imageFile == null && productDetails.getImageUrl() != null) {
            String oldImageUrl = productDetails.getImageUrl();
            productDetails.setImageUrl(null);  
            
            removeProductImage(oldImageUrl);
        } 

            // Call the service method to update the product
            Product updatedProduct = productService.updateProduct(id, productDetails, imageFile);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // Handle error gracefully
        }
    }
    public void removeProductImage(String imageUrl) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            String uploadDir = "src/main/resources/static/"; 
            File file = new File(uploadDir + imageUrl); 
            
            if (file.exists()) {
                // Delete the file
                boolean deleted = file.delete();
                if (!deleted) {
                    System.out.println("Failed to delete the file: " + imageUrl);
                } else {
                    System.out.println("Successfully deleted the file: " + imageUrl);
                }
            }
        }
    }
    
    
    // Delete a product by ID
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
