package com.example.back.services;

import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Restitution;
import com.example.back.reopsitory.PFEInternshipRepository;
import com.example.back.reopsitory.RestitutionRepository;
import com.example.back.reopsitory.TeacherRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class RestitutionService implements IRestitutionService{

    RestitutionRepository restitutionRepository;
    PFEInternshipRepository pfeInternshipRepository;
    TeacherRepository teacherRepository;
    @Override
    public List<Restitution> getAll() {
        return restitutionRepository.findAll();
    }

    @Override
    public Restitution getById(Long id) {
        return restitutionRepository.findById(id).orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    @Override
    public Restitution save(Restitution restitution) {
        return restitutionRepository.save(restitution);
    }

    @Override
    public void delete(Long id) {
        restitutionRepository.deleteById(id);
    }

    public Restitution addRestitutionAndAssignToInternship(Restitution restitution, Long internshipId) {
        Optional<InternshipPFE> internshipOptional = pfeInternshipRepository.findById(internshipId);

        if (internshipOptional.isEmpty()) {
            throw new RuntimeException("InternshipPFE with ID " + internshipId + " not found.");
        }

        InternshipPFE internship = internshipOptional.get();

        // Check if the internship already has a restitution
        if (internship.getRestitution() != null) {
            throw new RuntimeException("Internship already has a restitution assigned.");
        }

        // Assign restitution to internship
        internship.setRestitution(restitution);
        restitutionRepository.save(restitution);
        pfeInternshipRepository.save(internship);

        return restitution;
    }

}
