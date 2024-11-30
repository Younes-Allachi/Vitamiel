package com.vitamiel.domain;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Document(collection = "orders")
@JsonIgnoreProperties(ignoreUnknown = true) // Ignore unknown properties during deserialization
public class Order {
    @Id
    private String id;
    private String userId;        // Reference to the user who created the order
    private String nom;            // Last name (nom) of the user
    private String prénom;         // First name (prénom) of the user
    private String pays;           // Country of the user (can be null)
    private List<String> productIds;
    private String username;       // Username of the user
    private String email;          // Email of the user
    private String status;         // Payment status (e.g., "PAID", "PENDING")
    private Instant orderDate;
    private double totalAmount;    // Total amount of the order
    private String currency;       // Currency used in the order (e.g., EUR, USD)
    private String orderId;

    // Constructor with all fields, setting null for missing fields
    public Order(String userId, String nom, String prénom, String pays, List<String> productIds, 
                 String username, String email, String status, Double totalAmount, 
                 String currency, String orderId) {
        this.userId = userId != null ? userId : null;  // Handle null explicitly
        this.nom = nom != null ? nom : null;
        this.prénom = prénom != null ? prénom : null;
        this.pays = pays != null ? pays : null;
        this.productIds = productIds != null ? productIds : null;
        this.username = username != null ? username : null;
        this.email = email != null ? email : null;
        this.status = status != null ? status : null;
        this.orderDate = Instant.now();  // Automatically set to current timestamp
        this.totalAmount = totalAmount != null ? totalAmount : 0.0;  // Default to 0.0 if missing
        this.currency = currency != null ? currency : null;
        this.orderId = orderId != null ? orderId : null;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrénom() {
        return prénom;
    }

    public void setPrénom(String prénom) {
        this.prénom = prénom;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public List<String> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<String> productIds) {
        this.productIds = productIds;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Instant orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}
