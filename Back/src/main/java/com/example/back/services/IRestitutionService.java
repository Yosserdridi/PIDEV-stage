package com.example.back.services;

import com.example.back.entities.Restitution;

import java.util.List;

public interface IRestitutionService {
    List<Restitution> getAll();
    Restitution getById(Long id);
    Restitution save(Restitution restitution);
    void delete(Long id);
    Restitution addRestitutionAndAssignToInternship(Restitution restitution, Long internshipId);
}
