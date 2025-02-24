package com.example.back.services;

import com.example.back.entities.InternshipConvention;
import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Student;

import java.util.List;

public interface IStudentService {
    Student save(Student student);

    Student getById(Long id);

    List<Student> getAll();
}
