package com.example.back.controller;
import com.example.back.services.SmsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")

public class SmsController {
    @Autowired
    private SmsService smsService;

    @PostMapping("/send")
    public ResponseEntity<String> sendSms(@RequestParam String userPhone, @RequestParam String messageContent) {
        try {
            smsService.sendSms(userPhone, messageContent);  // Make sure smsService is working
            return ResponseEntity.ok("SMS sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending SMS.");
        }
    }

}
