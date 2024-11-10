package com.vitamiel.domain;

public class PayPalOrderResponse {
    private String paymentId;
    private String approvalUrl;

    public PayPalOrderResponse(String paymentId, String approvalUrl) {
        this.paymentId = paymentId;
        this.approvalUrl = approvalUrl;
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
}

