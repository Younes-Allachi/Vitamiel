package com.vitamiel.repository;

import com.vitamiel.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findOneByActivationKey(String activationKey);
    
    List<User> findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant dateTime);
    
    Optional<User> findById(String id);

    Optional<User> findOneByResetKey(String resetKey);
    
    Optional<User> findOneByEmailIgnoreCase(String email);
    
    Optional<User> findOneByLogin(String login);
    
    // MongoDB doesn't support @EntityGraph, so we'll exclude it.
    Optional<User> findOneWithAuthoritiesByLogin(String login);
    
    Optional<User> findOneWithAuthoritiesByEmailIgnoreCase(String email);

    // MongoDB doesn't have the concept of pagination in the same way as JPA,
    // but Pageable can still be used for MongoDB queries.
    Page<User> findAllByActivatedIsTrue(Pageable pageable);

    // Custom query method
    Page<User> findAllByIdNotNullAndActivatedIsTrue(Pageable pageable);
}
