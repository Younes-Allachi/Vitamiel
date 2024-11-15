package com.vitamiel.web.rest;

import com.vitamiel.config.PayPalService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vitamiel.domain.PayPalOrderResponse;
import com.vitamiel.domain.PaymentDetails;
import com.vitamiel.domain.PaymentRequest;

@RestController
@RequestMapping("/api/paypal")
public class PayPalController {

    @Autowired
    private PayPalService payPalService;

    // Create a PayPal order and return the approval URL and orderId (EC token)
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentRequest paymentRequest) {
        try {
            // Validate total amount and currency
            if (paymentRequest.getTotal() == null || paymentRequest.getTotal() <= 0) {
                return ResponseEntity.badRequest().body("Amount must be greater than zero.");
            }

            if (paymentRequest.getCurrency() == null || paymentRequest.getCurrency().isEmpty()) {
                paymentRequest.setCurrency("USD");
            }

            System.out.println("Creating PayPal order with total: " + paymentRequest.getTotal()
                    + " and currency: " + paymentRequest.getCurrency());

            // Call service to create the PayPal order
            Payment payment = payPalService.createPayment(paymentRequest.getTotal(), paymentRequest.getCurrency());
            
            // Extract approval URL and payment ID
            String approvalUrl = payment.getLinks().stream()
                .filter(link -> "approval_url".equals(link.getRel()))
                .map(link -> link.getHref())
                .findFirst()
                .orElse(null);

            // Payment ID (not to be confused with EC token)
            String paymentId = payment.getId(); 
            
            // EC token (orderId) extracted from the approval URL
            String orderId = approvalUrl != null ? approvalUrl.split("token=")[1] : null;  
            
            if (approvalUrl == null) {
                return ResponseEntity.status(500).body("Approval URL not found.");
            }

            // Return the paymentId, orderId (EC token), and approval URL to the frontend
            PayPalOrderResponse response = new PayPalOrderResponse(paymentId, orderId, approvalUrl);
            return ResponseEntity.ok(response);
    
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid request data.");
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating PayPal order.");
        }
    }

    // Capture the PayPal payment after approval
    @PostMapping("/capture-payment")
    public ResponseEntity<?> capturePayment(@RequestBody PaymentDetails paymentDetails) {
        try {
            // Use the orderId (EC token) instead of paymentId
            String ecToken = paymentDetails.getPaymentId();  // paymentId is actually EC token
            String payerId = paymentDetails.getPayerId(); 

            // Execute the payment using the EC token (orderId) and payerId
            Payment payment = payPalService.executePayment(ecToken, payerId);
            
            // Return the captured payment details (for debugging or further processing)
            return ResponseEntity.ok(payment);
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error capturing PayPal payment: " + e.getMessage());
        }
    }
}
