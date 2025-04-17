package com.example.back.service;

import com.example.back.entities.CompanyAgent;
import com.example.back.entities.Student;
import com.example.back.entities.Teacher;
import com.example.back.repository.CompanyAgentRepository;
import com.example.back.repository.StudentRepository;
import com.example.back.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final CompanyAgentRepository companyAgentRepository;
    @Autowired
    public UserServiceImpl(
            TeacherRepository teacherRepository,
            StudentRepository studentRepository,
            CompanyAgentRepository companyAgentRepository
    ) {
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.companyAgentRepository = companyAgentRepository;
    }
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<CompanyAgent> getAllCompanyAgents() {
        return companyAgentRepository.findAll();
    }
}
