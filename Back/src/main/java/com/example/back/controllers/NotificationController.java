package com.example.back.controllers;

import com.example.back.DTO.SimpleNotification;
import com.example.back.services.SimpleNotificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/notification")
public class NotificationController {

    private SimpleNotificationService notificationService;

    // ✅ Get all notifications
    @GetMapping
    public List<SimpleNotification> getAllNotifications() {
        return notificationService.getAll();
    }

    // ✅ Clear all notifications
    @DeleteMapping("/clear")
    public void clearNotifications() {
        notificationService.clear();
    }
}
