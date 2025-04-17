package com.example.back.control;

import com.example.back.entities.CompanyAgent;
import com.example.back.entities.Student;
import com.example.back.entities.Teacher;
import com.example.back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/teachers")
    public List<Teacher> getAllTeachers() {
        return userService.getAllTeachers();
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return userService.getAllStudents();
    }

    @GetMapping("/companyAgents")
    public List<CompanyAgent> getAllCompanyAgents() {
        return userService.getAllCompanyAgents();
    }
}
