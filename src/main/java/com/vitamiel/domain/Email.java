package com.vitamiel.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "emails")
public class Email {

    @Id
    private String id;
    private String email;

    public Email() {
    }

    // Constructor for setting email
    public Email(String email) {
        this.email = email;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;  
    }
}
