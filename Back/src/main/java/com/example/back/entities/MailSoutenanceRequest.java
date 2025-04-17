package com.example.back.entities;

import jakarta.persistence.*;

@Entity
public class MailSoutenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "mail_request_id", referencedColumnName = "id")
    private MailRequest mailRequest;  // This is a separate entity for email request

    @ManyToOne
    @JoinColumn(name = "soutenance_id", referencedColumnName = "id")
    private Soutenance soutenance;  // This is the soutenance entity

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MailRequest getMailRequest() {
        return mailRequest;
    }

    public void setMailRequest(MailRequest mailRequest) {
        this.mailRequest = mailRequest;
    }

    public Soutenance getSoutenance() {
        return soutenance;
    }

    public void setSoutenance(Soutenance soutenance) {
        this.soutenance = soutenance;
    }
}
