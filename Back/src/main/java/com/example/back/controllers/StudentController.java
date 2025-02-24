package com.example.back.controllers;

import com.example.back.entities.InternshipConvention;
import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Student;
import com.example.back.entities.TypeInternship;
import com.example.back.services.IPFEInternshipService;
import com.example.back.services.IStudentService;
import com.example.back.services.InternshipConventionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/student")
public class StudentController {
    IStudentService studentService;

    @PostMapping("/add")
    public Student create(@RequestBody Student student) {
        return studentService.save(student);
    }


    @GetMapping("/getById/{id}")
    public Student getById(@PathVariable Long id) {
        return studentService.getById(id);
    }

    private IPFEInternshipService internshipConventionService;

    @GetMapping("/internshipconvention/{studentId}")
    public ResponseEntity<InternshipConvention> getInternshipByStudentIdAndType(
            @PathVariable Long studentId) {

        Optional<InternshipConvention> internship = internshipConventionService.getByStudentIdAndTypeInternship(studentId);

        return internship.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getAll")
    public List<Student> getAll() {
        return studentService.getAll();
    }


}
