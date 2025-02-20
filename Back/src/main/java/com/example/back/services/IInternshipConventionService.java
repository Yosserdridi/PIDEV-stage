package com.example.back.services;

import com.example.back.DTO.InternshipConventionDTO;
import com.example.back.entities.InternshipConvention;

import java.util.List;

public interface IInternshipConventionService {
    List<InternshipConvention> getAll();
    InternshipConvention getById(Long id);
    InternshipConvention save(InternshipConvention internship);
    void delete(Long id);
    InternshipConvention addInternshipConvention(Long studentId, InternshipConvention internshipConvention);

    List<InternshipConventionDTO> getAllInternshipConventionsWithStudentFirstName();
}
