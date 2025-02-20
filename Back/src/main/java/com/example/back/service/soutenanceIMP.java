package com.example.back.service;

import com.example.back.entities.Soutenance;
import com.example.back.repository.soutenancerep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class soutenanceIMP implements soutenanceService{
    @Autowired
   private soutenancerep soutenancerep;

    @Override
    public Soutenance addSoutenance(Soutenance Soutenance) {
        return soutenancerep.save(Soutenance);
    }

    @Override
    public Soutenance updateSoutenance(Soutenance Soutenance) {
        return soutenancerep.save(Soutenance);
    }

    @Override
    public void deleteSoutenance(Integer id) {
        soutenancerep.deleteById(id);

    }
}
