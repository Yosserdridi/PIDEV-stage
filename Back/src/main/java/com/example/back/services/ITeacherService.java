package com.example.back.services;

import com.example.back.entities.Teacher;

public interface ITeacherService {
    Teacher save(Teacher teacher);
    String assignRestitutionToTeacher(Long restitutionId, Long teacherId);
}
