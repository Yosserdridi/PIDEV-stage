package com.example.back.services;

import com.example.back.entities.Files;
import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Restitution;
import com.example.back.reopsitory.PFEInternshipRepository;
import com.example.back.reopsitory.Report;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ReportService implements IReportService {

    PFEInternshipRepository pfeInternshipRepository;
    Report reportrepo;
    public Files addReportAndAssignToInternship(Files report, Long internshipId) {
        Optional<InternshipPFE> internshipOptional = pfeInternshipRepository.findById(internshipId);

        if (internshipOptional.isEmpty()) {
            throw new RuntimeException("InternshipPFE with ID " + internshipId + " not found.");
        }

        InternshipPFE internship = internshipOptional.get();

        // Check if the internship already has a restitution
        if (internship.getReport() != null) {
            throw new RuntimeException("Internship already has a report.");
        }

        // Assign restitution to internship
        internship.setReport(report);
        reportrepo.save(report);
        pfeInternshipRepository.save(internship);

        return report;
    }
}
