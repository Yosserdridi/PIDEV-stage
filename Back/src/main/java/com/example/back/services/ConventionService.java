package com.example.back.services;

import com.example.back.entities.InternshipConvention;

import java.util.List;

public interface ConventionService {

    InternshipConvention   addInternshipConvention(InternshipConvention internshipConvention);
    InternshipConvention  getInternshipConvention(long id);
    List<InternshipConvention> getAllInternshipConventions();
    InternshipConvention   updateInternshipConvention(InternshipConvention internshipConvention);
    void   deleteInternshipConvention(long id);




}
