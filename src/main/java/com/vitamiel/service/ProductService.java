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

    /**
     * Add a new product with multilingual support for names and descriptions.
     *
     * @param enName        Product name in English
     * @param esName        Product name in Spanish
     * @param frName        Product name in French
     * @param nlName        Product name in Dutch
     * @param enDescription Product description in English
     * @param esDescription Product description in Spanish
     * @param frDescription Product description in French
     * @param nlDescription Product description in Dutch
     * @param origin        Product origin
     * @param weightKg      Product weight in kilograms
     * @param price         Product price
     * @param stockQuantity Product stock quantity
     * @param categoryId    Product category ID
     * @param imageFile     Product image file
     * @return The saved product object
     * @throws IOException if the image file cannot be saved
     */
    public Product addProduct(String enName, String esName, String frName, String nlName,
                              String enDescription, String esDescription, String frDescription, String nlDescription,
                              String origin, double weightKg, double price, int stockQuantity, String categoryId, MultipartFile imageFile) throws IOException {

        Product product = new Product();
        
        // Setting multilingual fields
        product.setEnName(enName);
        product.setEsName(esName);
        product.setFrName(frName);
        product.setNlName(nlName);
        
        product.setEnDescription(enDescription);
        product.setEsDescription(esDescription);
        product.setFrDescription(frDescription);
        product.setNlDescription(nlDescription);
        
        // Setting other product fields
        product.setOrigin(origin);
        product.setWeightKg(weightKg);
        product.setPrice(price);
        product.setStockQuantity(stockQuantity);
        product.setCategoryId(categoryId);

        String imageUrl = saveImage(imageFile);  // Save image and return the file path
        product.setImageUrl(imageUrl);  // Store the relative path for the image in the product object

        return productRepository.save(product);
    }

    /**
     * Update an existing product with multilingual support for names and descriptions.
     *
     * @param productId     Product ID
     * @param productDetails The updated product object with multilingual fields
     * @param imageFile     Product image file
     * @return The updated product object
     */
    public Product updateProduct(String productId, Product productDetails, MultipartFile imageFile) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product with ID " + productId + " not found"));

        // Updating multilingual fields
        product.setEnName(productDetails.getEnName());
        product.setEsName(productDetails.getEsName());
        product.setFrName(productDetails.getFrName());
        product.setNlName(productDetails.getNlName());
        
        product.setEnDescription(productDetails.getEnDescription());
        product.setEsDescription(productDetails.getEsDescription());
        product.setFrDescription(productDetails.getFrDescription());
        product.setNlDescription(productDetails.getNlDescription());

        // Updating other product fields
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setCategoryId(productDetails.getCategoryId());

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

    /**
     * Save the image and return the path where it's stored.
     *
     * @param imageFile The image file to be saved
     * @return The relative image path
     * @throws IOException If an error occurs while saving the image
     */
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

    /**
     * Delete a product by its ID.
     *
     * @param productId The product ID
     */
    public void deleteProduct(String productId) {
        productRepository.deleteById(productId);
    }

    /**
     * Retrieve all products.
     *
     * @return List of all products
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Retrieve a product by its ID.
     *
     * @param productId The product ID
     * @return The product object if found, otherwise Optional.empty()
     */
    public Optional<Product> getProductById(String productId) {
        return productRepository.findById(productId);
    }
}
