package com.example.back.services;

import com.example.back.entities.Student;
import com.example.back.reopsitory.StudentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
@Slf4j
public class StudentService implements IStudentService{

    StudentRepository studentRepository;
    @Override
    public Student save(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student getById(Long id) {
        return studentRepository.findById(id).orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
    }
}
