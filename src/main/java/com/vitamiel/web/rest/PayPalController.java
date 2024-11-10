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

    /**
     * Endpoint to create a PayPal order and return the approval URL.
     */
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentRequest paymentRequest) {
    try {
        // Validate the incoming request
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

        String paymentId = payment.getId(); // Get the PayPal payment ID

        if (approvalUrl == null) {
            return ResponseEntity.status(500).body("Approval URL not found.");
        }

        // Return the paymentId and approval URL to the frontend
        PayPalOrderResponse response = new PayPalOrderResponse(paymentId, approvalUrl);
        return ResponseEntity.ok(response);

    } catch (IllegalArgumentException e) {
        e.printStackTrace();
        return ResponseEntity.badRequest().body("Invalid request data.");
    } catch (PayPalRESTException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Error creating PayPal order.");
    }
}


    /**
     * Endpoint to capture the PayPal payment after the user approves the transaction.
     */
    @PostMapping("/capture-payment")
    public ResponseEntity<?> capturePayment(@RequestBody PaymentDetails paymentDetails) {
        try {
            // Call PayPal service to execute the payment
            Payment payment = payPalService.executePayment(paymentDetails.getPaymentId(), paymentDetails.getPayerId());
            return ResponseEntity.ok(payment);

        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error capturing PayPal payment.");
        }
    }
}
