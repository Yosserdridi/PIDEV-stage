package com.example.back.dto;

import com.example.back.entities.MailRequest;
import com.example.back.entities.Soutenance;
import lombok.Data;

public class MailSoutenanceRequest {
    private MailRequest mailRequest;
    private Soutenance soutenance;
}