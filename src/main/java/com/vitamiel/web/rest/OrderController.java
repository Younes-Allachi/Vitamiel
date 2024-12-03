package com.vitamiel.web.rest;

import com.vitamiel.config.ResourceNotFoundException;
//import com.vitamiel.domain.Category;
import com.vitamiel.domain.Order;
import com.vitamiel.domain.Product;
import com.vitamiel.service.OrderService;
import com.vitamiel.service.ProductService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService; // Inject the ProductService to handle stock updates

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable String userId) {
        List<Order> orders = orderService.getUserOrders(userId);
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/allorders")
    public ResponseEntity<Page<Order>> getAllOrders(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Page<Order> orders = orderService.getAllOrders(page, size);

            // return new ResponseEntity<>(categories, HttpStatus.OK);

            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Page.empty());
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders() {
        List<Order> orders = orderService.getAllUserOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Order> saveOrder(@RequestBody Order orderRequest) {
        List<String> productIds = orderRequest.getProductIds();
        List<Integer> quantities = orderRequest.getQuantities();

        Order savedOrder = orderService.saveOrder(orderRequest);

        for (int i = 0; i < productIds.size(); i++) {
            String productId = productIds.get(i);
            int quantityOrdered = quantities.get(i);

            System.out.println("Quantity ordered:"+quantityOrdered);
            Product product = productService.getProductById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));

            System.out.println("Get Product:"+product);

            int currentStock = product.getStockQuantity();
            int newStockQuantity = currentStock - quantityOrdered;

            product.setStockQuantity(newStockQuantity);
            productService.updateProduct(productId, product, null); // Update the product in the repository
        }

        return ResponseEntity.ok(savedOrder);
    }

}
