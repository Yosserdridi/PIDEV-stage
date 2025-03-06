package com.example.back.services;

import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Restitution;
import com.example.back.entities.Teacher;

import java.util.List;

public interface ITeacherService {
    Teacher save(Teacher teacher);
    String assignRestitutionToTeacher(Long restitutionId, Long teacherId);

    List<Teacher> getAll();

    Teacher getById(Long id);

    List<InternshipPFE> getUnassignedInternships() ;

    void assignInternshipToTeacher(Long teacherId, Long internshipId) ;
}
