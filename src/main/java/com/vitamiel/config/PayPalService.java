package com.vitamiel.config;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class PayPalService {

    private APIContext apiContext;

    private final String clientId = "Afey45hZ-9MTTToY1cHUZG146w8WGpSJ9W64lJqeo_-qx2oHl7s2iNR462N-WWa4Jxqm9UTAdv274SC_";
    private final String clientSecret = "EPfMkkg-SEP8A37byWax1nom2mJef-xr8Nw2so1wmBptv2IG6AKd5_GjXnuBms1tPsxePu1P1WvsIQQc";
    private final String mode = "sandbox";  
    private final String returnUrl = "http://localhost:8080/paypal/return"; 
    private final String cancelUrl = "http://localhost:8080/paypal/cancel"; 

    public PayPalService() {
        this.apiContext = new APIContext(clientId, clientSecret, mode);
    }

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

        // Call PayPal API to create the payment
        Payment createdPayment = payment.create(apiContext);  

        // Log the payment details (optional)
        System.out.println("Payment created with ID: " + createdPayment.getId());

        return createdPayment;  // Return the full Payment object, which contains the order ID
    }

    // Capture payment after approval
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecution); 
    }
}
