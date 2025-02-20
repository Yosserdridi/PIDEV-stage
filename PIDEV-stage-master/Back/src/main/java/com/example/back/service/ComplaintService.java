package com.example.back.service;

import com.example.back.entities.Complaint;
import com.example.back.entities.StatusComplaint;
import com.example.back.entities.TypeComplaint;
import com.example.back.repository.ComplaintRep;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ComplaintService implements IComplaint {

    @Autowired
    private ComplaintRep complaintRep;

    @Override
    public Complaint addComplaint(Complaint complaint) {
        // Enregistrer la plainte dans la base de données
        return complaintRep.save(complaint);
    }

    @Override
    public Complaint updateComplaint(Complaint complaint) {
        return complaintRep.save(complaint);
    }

    @Override
    public void deleteComplaint(Long id) {
        complaintRep.deleteById(id);
    }

    @Override
    public List<Complaint> getComplaint() {
        return complaintRep.findAll();
    }

    @Override
    public Complaint GetComplaintById(Long id) {
        return complaintRep.findById(id).orElse(null);
    }

    @Override
    public List<Complaint> findByTypeC(TypeComplaint typeC) {
        return complaintRep.findByTypeC(typeC);
    }

    @Override
    public List<Complaint> findByStatusComplaint(StatusComplaint statusC) {
        return complaintRep.findByTypeStatus(statusC);
    }
}
