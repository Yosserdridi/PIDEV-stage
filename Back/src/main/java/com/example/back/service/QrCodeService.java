package com.example.back.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

@Service
public class QrCodeService {

    public byte[] generateQrCodeFromUrl(String data) {
        try {
            if (data == null || data.isEmpty()) {
                System.err.println("❌ Cannot generate QR code: data is null or empty!");
                return null;
            }

            System.out.println("📦 Generating QR code with data: " + data);

            String apiUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;

            RestTemplate restTemplate = new RestTemplate();
            byte[] result = restTemplate.getForObject(apiUrl, byte[].class);

            System.out.println("✅ QR Code generated successfully.");
            return result;
        } catch (Exception e) {
            System.err.println("❌ Error generating QR code: " + e.getMessage());
            return null;
        }
    }
}