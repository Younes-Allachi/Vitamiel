package com.vitamiel.domain;


/**
 * Represents payment details.
 */
public class PaymentDetails {
    private String paymentId;
    private String payerId;

    /**
     * Gets the payment ID.
     * 
     * @return the payment ID
     */
    public String getPaymentId() {
        return paymentId;
    }

    /**
     * Sets the payment ID.
     * 
     * @param paymentId the payment ID to set
     */
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    /**
     * Gets the payer ID.
     * 
     * @return the payer ID
     */
    public String getPayerId() {
        return payerId;
    }

    /**
     * Sets the payer ID.
     * 
     * @param payerId the payer ID to set
     */
    public void setPayerId(String payerId) {
        this.payerId = payerId;
    }

    @Override
    public String toString() {
        return "PaymentDetails{" +
                "paymentId='" + paymentId + '\'' +
                ", payerId='" + payerId + '\'' +
                '}';
    }
}
