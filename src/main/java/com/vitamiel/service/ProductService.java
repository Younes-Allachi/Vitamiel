package com.vitamiel.service;

import com.vitamiel.domain.Product;
import com.vitamiel.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    private final String uploadDir = "src/main/resources/static/";

    public Product addProduct(String name, String description, String origin, double weightKg, double price,
                              int stockQuantity, String categoryId, MultipartFile imageFile) throws IOException {

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setOrigin(origin);
        product.setWeightKg(weightKg);
        product.setPrice(price);
        product.setStockQuantity(stockQuantity);
        product.setCategoryId(categoryId);  // Set the category ID (not the full category object)

        String imageUrl = saveImage(imageFile);  // Save image and return the file path
        product.setImageUrl(imageUrl);  // Store the relative path for the image in the product object

        return productRepository.save(product);
    }

    public Product updateProduct(String productId, Product productDetails, MultipartFile imageFile) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product with ID " + productId + " not found"));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setCategoryId(productDetails.getCategoryId());  // Update categoryId

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String imageUrl = saveImage(imageFile);  // Save the new image and return the file path
                product.setImageUrl(imageUrl);  // Update the image URL
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image: " + e.getMessage());
            }
        }

        return productRepository.save(product);
    }

    private String saveImage(MultipartFile imageFile) throws IOException {
        if (imageFile.isEmpty()) {
            throw new IOException("No file uploaded");
        }
    
        String filename = StringUtils.cleanPath(imageFile.getOriginalFilename());
        Path uploadPath = Paths.get(uploadDir + filename);  // This saves the image directly inside src/main/resources
    
        if (!Files.exists(uploadPath.getParent())) {
            Files.createDirectories(uploadPath.getParent());  // Make sure the directory exists
        }
    
        imageFile.transferTo(uploadPath);
    
        return filename;  // Store the relative path in the product (like '1.png')
    }
    

    public void deleteProduct(String productId) {
        productRepository.deleteById(productId);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String productId) {
        return productRepository.findById(productId);
    }
}
