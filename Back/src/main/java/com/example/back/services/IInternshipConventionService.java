package com.example.back.services;

import com.example.back.DTO.InternshipConventionDTO;
import com.example.back.entities.InternshipConvention;
import com.example.back.entities.TypeInternship;

import java.util.List;

public interface IInternshipConventionService {
    List<InternshipConvention> getAll();
    InternshipConvention getById(Long id);
    InternshipConvention save(InternshipConvention internship);
    void delete(Long id);

    InternshipConvention addInternshipConvention(Long studentId, InternshipConvention internshipConvention);

    List<InternshipConventionDTO> getAllInternshipConventionsWithStudentFirstName();

    InternshipConvention getInternshipConventionByStudentIdAndType(Long studentId, TypeInternship typeInternship);

    Long getInternshipConventionId(Long studentId);

    List<InternshipConvention> getInternshipConventionsForStudent(Long studentId) ;

    Long getPFEInternshipConventionId(Long studentId);
}
