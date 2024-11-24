package com.vitamiel.web.rest;

import com.vitamiel.domain.Email;
import com.vitamiel.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/useremail")
public class EmailController {

    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    // Create a new category
    @PostMapping
    public ResponseEntity<?> saveEmail(@RequestBody Email email) {
        System.out.println("Received email: " + email); 
        try {
            if (email == null || email.getEmail() == null || email.getEmail().isEmpty()) {
                return ResponseEntity.badRequest().body("Email cannot be null or empty.");
            }

            Email savedEmail = emailService.saveEmail(email);
            return ResponseEntity.ok(savedEmail);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving the email: " + e.getMessage());
        }
    }
}