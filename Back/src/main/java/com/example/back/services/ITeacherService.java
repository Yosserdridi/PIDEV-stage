package com.example.back.services;

import com.example.back.entities.Restitution;
import com.example.back.entities.Teacher;

import java.util.List;

public interface ITeacherService {
    Teacher save(Teacher teacher);
    String assignRestitutionToTeacher(Long restitutionId, Long teacherId);

    List<Teacher> getAll();
}
