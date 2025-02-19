package com.example.back.controllers;

import com.example.back.entities.Teacher;
import com.example.back.services.ITeacherService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
