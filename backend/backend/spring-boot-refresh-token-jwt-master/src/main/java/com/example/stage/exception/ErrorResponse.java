package com.example.stage.exception;

public class ErrorResponse {
    private String message;
    private int status;

    // Constructeur
    public ErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
    }

    // Getters et setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}