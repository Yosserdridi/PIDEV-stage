package com.example.back.services;

import com.example.back.DTO.InternshipConventionDTO;
import com.example.back.entities.InternshipConvention;
import com.example.back.entities.Student;
import com.example.back.reopsitory.InternshipConventionRepository;
import com.example.back.reopsitory.StudentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    public InternshipConvention getById(Long id) {
        return internshipConventionRepository.findById(id).orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    @Override
    public InternshipConvention save(InternshipConvention internship) {
        return internshipConventionRepository.save(internship);
    }

    @Override
    public void delete(Long id) {
        internshipConventionRepository.deleteById(id);
    }

    public InternshipConvention addInternshipConvention(Long studentId, InternshipConvention internshipConvention) {
        // Find student by ID
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isEmpty()) {
            throw new RuntimeException("Student with ID " + studentId + " not found.");
        }

        Student student = studentOptional.get();

        internshipConvention.setStudent(student);

        return internshipConventionRepository.save(internshipConvention);
    }

    public List<InternshipConventionDTO> getAllInternshipConventionsWithStudentFirstName() {
        return internshipConventionRepository.findAllInternshipConventionsWithStudentFirstName();
    }
}
