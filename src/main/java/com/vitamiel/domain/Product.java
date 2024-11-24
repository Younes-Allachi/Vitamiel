package com.vitamiel.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "products")
public class Product {

    @Id
    private String id;

    @Field("id-Disabled")
    private String idDisabled;

    @Field("en-name")
    private String enName;

    @Field("es-name")
    private String esName;

    @Field("fr-name")
    private String frName;

    @Field("nl-name")
    private String nlName;

    @Field("en-description")
    private String enDescription;

    @Field("es-description")
    private String esDescription;

    @Field("fr-description")
    private String frDescription;

    @Field("nl-description")
    private String nlDescription;

    private String origin;
    private double weightKg;
    private double price;
    private int stockQuantity;
    private String imageUrl;
    private String categoryId;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdDisabled() {
        return idDisabled;
    }

    public void setIdDisabled(String idDisabled) {
        this.idDisabled = idDisabled;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getEsName() {
        return esName;
    }

    public void setEsName(String esName) {
        this.esName = esName;
    }

    public String getFrName() {
        return frName;
    }

    public void setFrName(String frName) {
        this.frName = frName;
    }

    public String getNlName() {
        return nlName;
    }

    public void setNlName(String nlName) {
        this.nlName = nlName;
    }

    public String getEnDescription() {
        return enDescription;
    }

    public void setEnDescription(String enDescription) {
        this.enDescription = enDescription;
    }

    public String getEsDescription() {
        return esDescription;
    }

    public void setEsDescription(String esDescription) {
        this.esDescription = esDescription;
    }

    public String getFrDescription() {
        return frDescription;
    }

    public void setFrDescription(String frDescription) {
        this.frDescription = frDescription;
    }

    public String getNlDescription() {
        return nlDescription;
    }

    public void setNlDescription(String nlDescription) {
        this.nlDescription = nlDescription;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public double getWeightKg() {
        return weightKg;
    }

    public void setWeightKg(double weightKg) {
        this.weightKg = weightKg;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
}
