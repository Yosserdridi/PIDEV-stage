package com.example.back.service;

import jakarta.activation.DataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.util.ByteArrayDataSource;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmailWithPdfAndQr(String to, String subject, String text, byte[] pdfBytes, byte[] qrBytes) {
        try {
            System.out.println("Preparing to send email to: " + to);
            System.out.println("Subject: " + subject);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);

            if (pdfBytes != null && pdfBytes.length > 0) {
                System.out.println("Attaching PDF (" + pdfBytes.length + " bytes)");
                DataSource pdfDataSource = new ByteArrayDataSource(pdfBytes, "application/pdf");
                helper.addAttachment("soutenance.pdf", pdfDataSource);
            } else {
                System.err.println("❌ PDF bytes are null or empty!");
            }

            if (qrBytes != null && qrBytes.length > 0) {
                System.out.println("Attaching QR code image (" + qrBytes.length + " bytes)");
                DataSource qrDataSource = new ByteArrayDataSource(qrBytes, "image/png");
                helper.addAttachment("qr-code.png", qrDataSource);
            } else {
                System.err.println("⚠️ QR code bytes are null or empty (optional).");
            }

            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + to);
        } catch (MessagingException e) {
            System.err.println("❌ Email send error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}