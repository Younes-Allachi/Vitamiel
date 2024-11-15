package com.vitamiel.domain;

public class PayPalOrderResponse {
    private String paymentId;
    private String approvalUrl;
    private String orderId;  // Add orderId (EC token)

    // Constructor
    public PayPalOrderResponse(String paymentId, String approvalUrl, String orderId) {
        this.paymentId = paymentId;
        this.approvalUrl = approvalUrl;
        this.orderId = orderId;  
    }

    // Getters and setters
    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getApprovalUrl() {
        return approvalUrl;
    }

    public void setApprovalUrl(String approvalUrl) {
        this.approvalUrl = approvalUrl;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}
