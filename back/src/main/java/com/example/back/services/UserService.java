package com.example.back.services;


import com.example.back.entities.Company;
import com.example.back.entities.Student;
import com.example.back.repository.CompanyRepository;
import com.example.back.repository.StudentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;


    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }


     public Company getCompanyById(Long id) {
         return companyRepository.findById(id).orElse(null);
    }


}
