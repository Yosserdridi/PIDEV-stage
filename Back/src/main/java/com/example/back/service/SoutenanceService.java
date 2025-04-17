package com.example.back.service;

import com.example.back.dto.SoutenanceDetailsDTO;
import com.example.back.dto.ValidatedFileDTO;
import com.example.back.entities.Files;
import com.example.back.entities.Soutenance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SoutenanceService {
    Soutenance addSoutenance(Soutenance soutenance);
    Soutenance updateSoutenance(Soutenance soutenance);
    void deleteSoutenance(Integer id);
    Page<Soutenance> getAllSoutenances(Pageable pageable);
    List<ValidatedFileDTO> getValidatedFiles();
    Soutenance scheduleSoutenance(int fileId, Soutenance soutenance);
    List<SoutenanceDetailsDTO> getAllSoutenanceDetails();
    Soutenance scheduleSoutenanceByStudentId(Long studentId, Soutenance soutenance);


}
