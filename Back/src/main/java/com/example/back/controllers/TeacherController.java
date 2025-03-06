package com.example.back.controllers;

import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Student;
import com.example.back.entities.Teacher;
import com.example.back.services.ITeacherService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/teacher")
public class TeacherController {

    ITeacherService teacherService;
    @PostMapping("/add")
    public Teacher create(@RequestBody Teacher teacher) {
        return teacherService.save(teacher);
    }

    @PostMapping("/{teacherId}/assignRestitution/{restitutionId}")
    public ResponseEntity<String> assignRestitutionToTeacher(
            @PathVariable Long teacherId,
            @PathVariable Long restitutionId) {
        try {
            // Call the service method and get the success message
            String responseMessage = teacherService.assignRestitutionToTeacher(restitutionId, teacherId);
            return new ResponseEntity<>(responseMessage, HttpStatus.OK);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST); // Handle errors
        }
    }

    @GetMapping("/getAll")
    public List<Teacher> getAll() {
        return teacherService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Teacher getById(@PathVariable Long id) {
        return teacherService.getById(id);
    }


    @GetMapping("/unassigned")
    public ResponseEntity<List<InternshipPFE>> getUnassignedInternships() {
        List<InternshipPFE> unassignedInternships = teacherService.getUnassignedInternships();
        return ResponseEntity.ok(unassignedInternships);
    }

    @PostMapping("/{teacherId}/assign-internship/{internshipId}")
    public ResponseEntity<String> assignInternshipToTeacher(
            @PathVariable Long teacherId,
            @PathVariable Long internshipId) {
        teacherService.assignInternshipToTeacher(teacherId, internshipId);
        return ResponseEntity.ok("Internship assigned successfully");
    }
}
