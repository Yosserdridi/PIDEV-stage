package com.example.back.services;

import com.example.back.entities.InternshipPFE;

import java.util.List;

public interface IPFEInternshipService {
    List<InternshipPFE> getAll();
    InternshipPFE getById(Long id);
    InternshipPFE save(InternshipPFE internship);
    void delete(Long id);

    void assignInternshipsToTeachers();
}
