package com.example.back.services;

import com.example.back.entities.*;
import com.example.back.reopsitory.InternshipConventionRepository;
import com.example.back.reopsitory.PFEInternshipRepository;
import com.example.back.reopsitory.RestitutionRepository;
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
    RestitutionRepository restitutionRepository;

    @Override
    public List<InternshipPFE> getAll() {
        return pfeInternshipRepository.findAll();
    }

    @Override
    public InternshipPFE getById(Long id) {
        return pfeInternshipRepository.findById(id).orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    public Optional<InternshipConvention> getByStudentIdAndTypeInternship(Long studentId) {
        return internshipConventionRepository.findByStudentIdAndTypeInternship(studentId, TypeInternship.INTERNSHIP_PFE);
    }

    public InternshipPFE assignInternshipPFEToStudent(Long studentId, InternshipPFE internshipPFE) {
        // Find the InternshipConvention where typeInternship = PFE for the given student
        InternshipConvention internshipConvention = internshipConventionRepository
                .findByStudentIdAndTypeInternship(studentId, TypeInternship.INTERNSHIP_PFE)
                .orElseThrow(() -> new RuntimeException("No PFE InternshipConvention found for student ID " + studentId));

        // Set bidirectional relationship
        internshipPFE.setInternshipConvention(internshipConvention);
        internshipConvention.setInternshipPFE(internshipPFE);

        // Save InternshipPFE (since it's the owning side of the relationship)
        pfeInternshipRepository.save(internshipPFE);

        // Save InternshipConvention to ensure relationship persistence
        internshipConventionRepository.save(internshipConvention);

        return internshipPFE;
    }

    public InternshipPFE addInternshipConvention(Long internshipConventionId, InternshipPFE internshipPFE ) {
        // Find Internship Convention by ID
        Optional<InternshipConvention> Optional = internshipConventionRepository.findById(internshipConventionId);
        if (Optional.isEmpty()) {
            throw new RuntimeException("Internship ConventionId " + internshipConventionId + " not found.");
        }

        InternshipConvention internshipConvention = Optional.get();

        internshipPFE.setInternshipConvention(internshipConvention);

        return pfeInternshipRepository.save(internshipPFE);
    }

    public Restitution addRestitution(Long pfeInternshipId, Restitution restitution) {
        // Find InternshipPFE by ID
        Optional<InternshipPFE> optionalInternshipPFE = pfeInternshipRepository.findById(pfeInternshipId);
        if (optionalInternshipPFE.isEmpty()) {
            throw new RuntimeException("InternshipPFE with ID " + pfeInternshipId + " not found.");
        }

        InternshipPFE internshipPFE = optionalInternshipPFE.get();

        // If necessary, you could save the Restitution entity here before associating it.
        // For example, if you want to save the restitution separately, you would do:
        restitutionRepository.save(restitution);

        // Set the restitution to the internshipPFE
        internshipPFE.setRestitution(restitution);

        // Save the updated InternshipPFE
        pfeInternshipRepository.save(internshipPFE);

        return restitution ;
    }

    @Override
    public void assignInternshipsToTeachers() {

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

/*
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

*/
 /*   public InternshipPFE getInternshipPFEForStudent(Long studentId, TypeInternship typeInternship) {
        // Find the InternshipConvention for the student and typeInternship
        InternshipConvention internshipConvention = internshipConventionRepository.findByStudentIdAndTypeInternship(studentId, typeInternship)
                .orElseThrow(() -> new RuntimeException("Internship Convention not found"));

        // Return the associated InternshipPFE if it exists
        InternshipPFE internshipPFE = internshipConvention.getInternshipPFE();
        if (internshipPFE != null) {
            return internshipPFE;
        } else {
            throw new RuntimeException("No PFE internship found for this student and Internship Convention");
        }
    }*/
}
