package com.example.back.services;

import com.example.back.DTO.SimpleNotification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SimpleNotificationService {
    private final List<SimpleNotification> notifications = new ArrayList<>();

    public void addNotification(String message) {
        notifications.add(new SimpleNotification(message));
    }

    public List<SimpleNotification> getAll() {
        return new ArrayList<>(notifications); // Return a copy to avoid external modification
    }

    public void clear() {
        notifications.clear();
    }
}
