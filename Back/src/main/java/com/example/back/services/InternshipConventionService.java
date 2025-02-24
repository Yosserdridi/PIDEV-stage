package com.example.back.services;

import com.example.back.DTO.InternshipConventionDTO;
import com.example.back.entities.InternshipConvention;
import com.example.back.entities.Student;
import com.example.back.entities.TypeInternship;
import com.example.back.reopsitory.InternshipConventionRepository;
import com.example.back.reopsitory.StudentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class InternshipConventionService implements IInternshipConventionService {

    InternshipConventionRepository internshipConventionRepository;
    StudentRepository studentRepository;


    @Override
    public List<InternshipConvention> getAll() {
        return internshipConventionRepository.findAll();
    }


    @Override
    public InternshipConvention save(InternshipConvention internship) {
        return internshipConventionRepository.save(internship);
    }

    @Override
    public void delete(Long id) {
        internshipConventionRepository.deleteById(id);
    }

    @Override
    public InternshipConvention addInternshipConvention(Long studentId, InternshipConvention internshipConvention) {
        // Find student by ID
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isEmpty()) {
            throw new RuntimeException("Student with ID " + studentId + " not found.");
        }

        Student student = studentOptional.get();

        // Ensure internshipConventions is initialized
        if (student.getInternshipConventions() == null) {
            student.setInternshipConventions(new HashSet<>());
        }

        // Add the new internshipConvention to the student's set
        student.getInternshipConventions().add(internshipConvention);

        // Save the student (CascadeType.ALL ensures the internshipConvention gets saved)
        studentRepository.save(student);

        return internshipConvention;
    }

    public List<InternshipConventionDTO> getAllInternshipConventionsWithStudentFirstName() {
        return null ;
              //  internshipConventionRepository.findAllInternshipConventionsWithStudentFirstName();
    }

    @Override
    public InternshipConvention getInternshipConventionByStudentIdAndType(Long studentId, TypeInternship typeInternship) {
        return null;
    }


    public Long getInternshipConventionId(Long studentId) {
        return null;
               // internshipConventionRepository.findInternshipConventionIdByStudentIdAndType(studentId);
    }

    @Override
    public List<InternshipConvention> getInternshipConventionsForStudent(Long studentId) {
        return null;
    }

    @Override
    public Long getPFEInternshipConventionId(Long studentId) {
        return null;
    }


    @Override
    public InternshipConvention getById(Long id) {
        return internshipConventionRepository.findById(id).orElseThrow(() -> new RuntimeException("Internship not found"));
    }


}
