package com.vitamiel.web.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/uploads")
public class FileUploadController {

    @Value("${file.upload-dir:./uploads}")  // Inject upload directory with default value if missing
    private String uploadDir;

    // Endpoint to upload product image
    @PostMapping("/product/{productId}")
    public String uploadProductImage(@PathVariable("productId") String productId, @RequestParam("file") MultipartFile file) {
        try {
            // Ensure the upload directory exists
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs(); // Create directory if it doesn't exist
            }

            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path targetLocation = Paths.get(uploadDir + File.separator + fileName);
            Files.copy(file.getInputStream(), targetLocation);

            return "/uploads/" + fileName;  // Return the relative path of the file
        } catch (IOException e) {
            return "Failed to upload file: " + e.getMessage();
        }
    }
}
