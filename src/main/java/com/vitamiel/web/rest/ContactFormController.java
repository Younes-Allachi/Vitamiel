package com.vitamiel.web.rest;

import com.vitamiel.domain.ContactForm;
import com.vitamiel.service.UserEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usercontact-form")
public class ContactFormController {

    private final UserEmailService userEmailService;

    @Autowired
    public ContactFormController(UserEmailService userEmailService) {
        this.userEmailService = userEmailService;
    }

    @PostMapping
    public ResponseEntity<?> submitContactForm(@RequestBody ContactForm contactForm) {
        System.out.println("Contact form before saving:"+contactForm);
        try {
            // Basic validation
            if (contactForm.getFirstName() == null || contactForm.getFirstName().isEmpty()) {
                return ResponseEntity.badRequest().body("First Name is required.");
            }
            if (contactForm.getLastName() == null || contactForm.getLastName().isEmpty()) {
                return ResponseEntity.badRequest().body("Last Name is required.");
            }
            if (contactForm.getEmail() == null || contactForm.getEmail().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required.");
            }
            if (contactForm.getSubject() == null || contactForm.getSubject().isEmpty()) {
                return ResponseEntity.badRequest().body("Subject is required.");
            }
            if (contactForm.getNotes() == null || contactForm.getNotes().isEmpty()) {
                return ResponseEntity.badRequest().body("Message is required.");
            }

            // Send the email asynchronously
            userEmailService.sendContactFormEmail(contactForm);

            return ResponseEntity.ok("Your message has been sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while sending the email: " + e.getMessage());
        }
    }
}
