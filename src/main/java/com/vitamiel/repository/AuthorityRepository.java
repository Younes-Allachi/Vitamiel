package com.vitamiel.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.vitamiel.domain.Authority;
import java.util.Optional;

public interface AuthorityRepository extends MongoRepository<Authority, String> {
    Optional<Authority> findById(String name); // Return type must be Optional<Authority>
}

