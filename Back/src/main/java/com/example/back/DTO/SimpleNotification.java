package com.example.back.DTO;

import java.time.LocalDateTime;

public class SimpleNotification {

    private String message;
    private LocalDateTime createdAt;

    public SimpleNotification(String message) {
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
