package com.example.back.service;

import com.example.back.entities.Soutenance;

public interface soutenanceService {
    Soutenance addSoutenance(Soutenance Soutenance);
    Soutenance updateSoutenance(Soutenance Soutenance);
    void deleteSoutenance(Integer id);
}
