package com.vitamiel.web.rest;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vitamiel.domain.PayPalOrderResponse;
import com.vitamiel.domain.PaymentDetails;
import com.vitamiel.domain.PaymentRequest;
import com.vitamiel.service.PayPalService;

@RestController
@RequestMapping("/api/paypal")
public class PayPalController {

    @Autowired
    private PayPalService payPalService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentRequest paymentRequest) {
        try {

            if (paymentRequest.getTotal() == null || paymentRequest.getTotal() <= 0) {
                return ResponseEntity.badRequest().body("Amount must be greater than zero.");
            }

            if (paymentRequest.getCurrency() == null || paymentRequest.getCurrency().isEmpty()) {
                paymentRequest.setCurrency("USD");
            }

            System.out.println("Creating PayPal order with total: " + paymentRequest.getTotal()
                    + " and currency: " + paymentRequest.getCurrency());

            Payment payment = payPalService.createPayment(paymentRequest.getTotal(), paymentRequest.getCurrency());

            String approvalUrl = payment.getLinks().stream()
                    .filter(link -> "approval_url".equals(link.getRel()))
                    .map(link -> link.getHref())
                    .findFirst()
                    .orElse(null);

            String paymentId = payment.getId();

            String orderId = approvalUrl != null ? approvalUrl.split("token=")[1] : null;

            if (approvalUrl == null) {
                return ResponseEntity.status(500).body("Approval URL not found.");
            }

            System.out.println("\n\nPayment ID: " + paymentId);
            System.out.println("\n\nOrder ID (EC Token): " + orderId);
            System.out.println("\n\nApproval URL: " + approvalUrl);

            PayPalOrderResponse response = new PayPalOrderResponse(paymentId,approvalUrl, orderId );
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid request data.");
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating PayPal order.");
        }
    }

    @PostMapping("/capture-payment")
    public ResponseEntity<?> capturePayment(@RequestBody PaymentDetails request) {
        try {
            System.out.println("\n\nrequest.getPaymentId(): " + request.getPaymentId());
            System.out.println("\n\nrequest.getPayerId(): " + request.getPayerId());

            // Use the Payment ID and Payer ID to capture the payment
            Payment payment = payPalService.executePayment(request.getPaymentId(), request.getPayerId());
            return ResponseEntity.ok(payment); // Return the captured payment details
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error capturing payment: " + e.getMessage());
        }
    }

}
