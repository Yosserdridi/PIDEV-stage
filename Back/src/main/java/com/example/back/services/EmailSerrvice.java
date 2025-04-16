package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSerrvice {

    @Autowired
    private JavaMailSender javaMailSender;

    /**
     * Envoie un email.
     * @param to L'adresse email du destinataire
     * @param subject Le sujet de l'email
     * @param body Le corps du message
     */
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@yourdomain.com");  // L'email de l'expéditeur
        message.setTo(to);                          // L'email du destinataire
        message.setSubject(subject);                // Le sujet de l'email
        message.setText(body);                      // Le corps du message

        // Envoie l'email
        javaMailSender.send(message);
    }

}
