package com.vitamiel.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
public class Category {

    @Id
    private String id;
    private int categoryId;
    private String nameEn; // English name
    private String nameEs; // Spanish name
    private String nameFr; // French name
    private String nameNl; // Dutch name

    // Constructor with categoryId and names for each language
    public Category(int categoryId, String nameEn, String nameEs, String nameFr, String nameNl) {
        this.categoryId = categoryId;
        this.nameEn = nameEn;
        this.nameEs = nameEs;
        this.nameFr = nameFr;
        this.nameNl = nameNl;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getNameEs() {
        return nameEs;
    }

    public void setNameEs(String nameEs) {
        this.nameEs = nameEs;
    }

    public String getNameFr() {
        return nameFr;
    }

    public void setNameFr(String nameFr) {
        this.nameFr = nameFr;
    }

    public String getNameNl() {
        return nameNl;
    }

    public void setNameNl(String nameNl) {
        this.nameNl = nameNl;
    }
}
