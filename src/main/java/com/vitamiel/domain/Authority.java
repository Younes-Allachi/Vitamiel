package com.vitamiel.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

@Document(collection = "authorities")
@JsonIgnoreProperties(value = { "new", "id" })
public class Authority implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String name;  // MongoDB uses String for the ID, so we use 'name' as the ID field

    public String getName() {
        return this.name;
    }

    public Authority name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Authority)) {
            return false;
        }
        return getName() != null && getName().equals(((Authority) o).getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName());
    }

    @Override
    public String toString() {
        return "Authority{" +
            "name='" + getName() + '\'' +
            "}";
    }
}
