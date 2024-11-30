package com.vitamiel.service;

import com.vitamiel.domain.Category;
import com.vitamiel.domain.Order;
import com.vitamiel.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getUserOrders(String userId) {
        return orderRepository.findAllByUserId(userId);
    }

    public Page<Order> getAllOrders(int page, int size) {
        Pageable pageable = PageRequest.of(page, size); // Create Pageable instance
        return orderRepository.findAll(pageable); // Fetch paginated orders
    }

    // Get all categories
    public List<Order> getAllUserOrders() {
        return orderRepository.findAll();
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}
