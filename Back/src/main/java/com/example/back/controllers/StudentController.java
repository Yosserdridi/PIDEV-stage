package com.example.back.controllers;

import com.example.back.entities.Student;
import com.example.back.services.IStudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/student")
public class StudentController {
    IStudentService studentService;

    @PostMapping("/add")
    public Student create(@RequestBody Student student) {
        return studentService.save(student);
    }
}
