package com.vitamiel.repository;

import com.vitamiel.domain.Email;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmailRepository extends MongoRepository<Email, String> {
    // You can add custom query methods here if needed, e.g.
    // Optional<Email> findByEmail(String email);
}
