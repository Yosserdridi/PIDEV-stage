package com.example.back.controller;

import com.example.back.entities.Company;
import com.example.back.entities.Student;
import com.example.back.repository.CompanyRepository;
import com.example.back.repository.StudentRepository;
import com.example.back.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final CompanyRepository companyRepository;
    private final StudentRepository studentRepository;
    UserService userService ;


    @GetMapping("/company/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable("id") Long id) {
        Company company = companyRepository.findById(id).orElse(null);
        System.out.println("Company data: " + company);
        if (company != null) {
            return ResponseEntity.ok(company);
        }
        return ResponseEntity.notFound().build();
    }



    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") Long id) {


        Student st = studentRepository.findById(id).orElse(null);
        System.out.println("Company data: " + st);
        if (st != null) {
            return ResponseEntity.ok(st);
        }
        return ResponseEntity.notFound().build();
    }


}
