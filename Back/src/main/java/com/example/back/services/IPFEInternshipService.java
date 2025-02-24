package com.example.back.services;

import com.example.back.entities.InternshipConvention;
import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Restitution;
import com.example.back.entities.TypeInternship;

import java.util.List;
import java.util.Optional;

public interface IPFEInternshipService {
    List<InternshipPFE> getAll();
    InternshipPFE getById(Long id);
    InternshipPFE save(InternshipPFE internship);
    void delete(Long id);

    InternshipPFE addInternshipConvention(Long internshipConventionId, InternshipPFE internshipPFE );

    Restitution addRestitution(Long pfeInternshipId, Restitution restitution );

    void assignInternshipsToTeachers();

    InternshipPFE assignInternshipPFEToStudent(Long studentId, InternshipPFE internshipPFE);

    //InternshipPFE getInternshipPFEForStudent(Long studentId, TypeInternship typeInternship) ;

    Optional<InternshipConvention> getByStudentIdAndTypeInternship(Long studentId) ;
}
