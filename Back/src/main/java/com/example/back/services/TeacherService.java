package com.example.back.services;

import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Restitution;
import com.example.back.entities.Student;
import com.example.back.entities.Teacher;
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
public class TeacherService implements ITeacherService{

    TeacherRepository teacherRepository;
    RestitutionRepository restitutionRepository;
    PFEInternshipRepository pfeInternshipRepository ;

    @Override
    public Teacher save(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public String assignRestitutionToTeacher(Long restitutionId, Long teacherId) {

        Optional<Restitution> restitutionOptional = restitutionRepository.findById(restitutionId);
        Optional<Teacher> teacherOptional = teacherRepository.findById(teacherId);

        if (restitutionOptional.isEmpty()) {
            throw new RuntimeException("Restitution with ID " + restitutionId + " not found.");
        }
        if (teacherOptional.isEmpty()) {
            throw new RuntimeException("Teacher with ID " + teacherId + " not found.");
        }

        Restitution restitution = restitutionOptional.get();
        Teacher teacher = teacherOptional.get();

        teacher.getRestitutions().add(restitution);

        teacherRepository.save(teacher);

        return "Restitution successfully assigned to teachers!";
    }

    @Override
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getById(Long id) {
        return teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("teacher not found"));
    }

    public List<InternshipPFE> getUnassignedInternships() {
        return pfeInternshipRepository.findUnassignedInternships();
    }



    // Assign a single internship to a teacher
    public void assignInternshipToTeacher(Long teacherId, Long internshipId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        // Fetch the internship by ID
        InternshipPFE internship = pfeInternshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));


        // Assign the internship to the teacher
        teacher.getInternshipPFEs().add(internship);

        // Save the teacher with the updated internship
        teacherRepository.save(teacher);
    }


}
