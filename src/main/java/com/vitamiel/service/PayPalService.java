package com.vitamiel.service;

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

        Payment createdPayment = payment.create(apiContext);

        String approvalUrl = createdPayment.getLinks().stream()
            .filter(link -> "approval_url".equals(link.getRel()))
            .map(link -> link.getHref())
            .findFirst()
            .orElse(null);

        if (approvalUrl == null) {
            throw new PayPalRESTException("Approval URL not found in the PayPal response.");
        }

        System.out.println("Payment created with ID: " + createdPayment.getId());
        return createdPayment;
    }

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecution);
    }
    
    
}
