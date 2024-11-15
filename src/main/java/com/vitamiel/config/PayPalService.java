package com.vitamiel.config;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class PayPalService {

    private APIContext apiContext;

    private final String clientId = "ASZqYCLb4pjpMt3Bq2RsQtrtgXYCA9Ido09Za0_GX7bCr5tth3Q4YEMJ9Bp33aL8ACCeaDRnrPjueGQW";
    private final String clientSecret = "EC_nlQdVsaTSYOuOGPB-xzLTOT3Ax0Hf_5BXkSUtaUQUw53ylaF-gxpOl15wAmARQL6hyzzshIrrEiqU";
    private final String mode = "sandbox";  
    private final String returnUrl = "http://localhost:8080/"; 
    private final String cancelUrl = "http://localhost:8080/"; 

    public PayPalService() {
        this.apiContext = new APIContext(clientId, clientSecret, mode);
    }

    // Creating the PayPal payment
    public Payment createPayment(double totalAmount, String currency) throws PayPalRESTException {
        if (totalAmount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero.");
        }

        Amount amount = new Amount();
        amount.setTotal(String.valueOf(totalAmount));
        amount.setCurrency(currency);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription("Payment for your order");

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(Arrays.asList(transaction));

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(returnUrl);
        payment.setRedirectUrls(redirectUrls);

        // Creating the payment and capturing the response
        Payment createdPayment = payment.create(apiContext);

        // Extract approval URL
        String approvalUrl = createdPayment.getLinks().stream()
            .filter(link -> "approval_url".equals(link.getRel()))
            .map(link -> link.getHref())
            .findFirst()
            .orElse(null);

        // Check if the approval URL was extracted successfully
        if (approvalUrl == null) {
            throw new PayPalRESTException("Approval URL not found in the PayPal response.");
        }

        System.out.println("Payment created with ID: " + createdPayment.getId());
        return createdPayment;
    }

    // Executing the PayPal payment with the EC token (order ID) and payer ID
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);  // paymentId is actually the EC token (orderId)

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(paymentId);

        // Execute the payment using the EC token (orderId)
        return payment.execute(apiContext, paymentExecution);
    }
}
