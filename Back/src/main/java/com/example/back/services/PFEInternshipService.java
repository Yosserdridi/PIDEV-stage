package com.example.back.services;

import com.example.back.entities.InternshipConvention;
import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Teacher;
import com.example.back.reopsitory.InternshipConventionRepository;
import com.example.back.reopsitory.PFEInternshipRepository;
import com.example.back.reopsitory.TeacherRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class PFEInternshipService implements IPFEInternshipService{

    PFEInternshipRepository pfeInternshipRepository;
    InternshipConventionRepository internshipConventionRepository;
    TeacherRepository teacherRepository;

    @Override
    public List<InternshipPFE> getAll() {
        return pfeInternshipRepository.findAll();
    }

    @Override
    public InternshipPFE getById(Long id) {
        return pfeInternshipRepository.findById(id).orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    @Override
    public InternshipPFE save(InternshipPFE internshipPFE) {
        if (internshipPFE.getInternshipConvention() != null) {
            Optional<InternshipConvention> conventionOpt = internshipConventionRepository.findById(
                    internshipPFE.getInternshipConvention().getId()
            );

            if (conventionOpt.isPresent()) {
                internshipPFE.setInternshipConvention(conventionOpt.get());
            } else {
                throw new RuntimeException("Internship Convention not found!");
            }
        } else {
            throw new RuntimeException("Internship Convention is required!");
        }

        return pfeInternshipRepository.save(internshipPFE);
    }


    @Override
    public void delete(Long id) {
        pfeInternshipRepository.deleteById(id);
    }


    public void assignInternshipsToTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        List<InternshipPFE> internships = pfeInternshipRepository.findAll();

        if (teachers.isEmpty()) {
            throw new RuntimeException("No teachers available for assignment.");
        }
        if (internships.isEmpty()) {
            throw new RuntimeException("No internships available for assignment.");
        }

        // Shuffle internships to ensure randomness
        Collections.shuffle(internships);

        int teacherIndex = 0;
        for (InternshipPFE internship : internships) {
            Teacher assignedTeacher = teachers.get(teacherIndex);

            // Ensure each teacher does not exceed 7 internships
            if (assignedTeacher.getInternshipPFEs().size() < 7) {
                internship.setTeacher(assignedTeacher);
                assignedTeacher.getInternshipPFEs().add(internship);
            } else {
                // Move to the next teacher if the current one is full
                teacherIndex++;
                if (teacherIndex >= teachers.size()) {
                    teacherIndex = 0;  // Restart assignment if needed
                }
                assignedTeacher = teachers.get(teacherIndex);
                internship.setTeacher(assignedTeacher);
                assignedTeacher.getInternshipPFEs().add(internship);
            }
        }

        // Save changes
        pfeInternshipRepository.saveAll(internships);
        teacherRepository.saveAll(teachers);
    }
}
