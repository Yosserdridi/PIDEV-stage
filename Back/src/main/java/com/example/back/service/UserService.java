package com.example.back.service;

import com.example.back.entities.CompanyAgent;
import com.example.back.entities.Student;
import com.example.back.entities.Teacher;

import java.util.List;

public interface UserService {
    List<Teacher> getAllTeachers();
    List<Student> getAllStudents();
    List<CompanyAgent> getAllCompanyAgents();
}
