package com.example.back.services;

import com.example.back.entities.Files;

public interface IReportService {
    Files addReportAndAssignToInternship(Files report, Long internshipId);
}
