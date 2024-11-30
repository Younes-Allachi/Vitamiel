package com.vitamiel.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.vitamiel.domain.Order;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findAllByUserId(String userId);
    
}
