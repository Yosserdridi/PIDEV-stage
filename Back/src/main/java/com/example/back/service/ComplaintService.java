package com.example.back.service;

import com.example.back.entities.Complaint;
import com.example.back.entities.Postulation;
import com.example.back.entities.StatusComplaint;
import com.example.back.entities.TypeComplaint;
import com.example.back.repository.ComplaintRep;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ComplaintService implements IComplaint {

    ComplaintRep complaintRep;

    @Override
    public Complaint addComplaint(Complaint complaint) {
        log.info("Ajout de la plainte : {}", complaint);
        return complaintRep.save(complaint);
    }


    @Override
    public Complaint updateComplaint(Complaint complaint) {
        return complaintRep.save(complaint);
    }


    public void deleteComplaint(Long id) {
        complaintRep.deleteById(id);
    }






    public List<Complaint> findByTypeC(TypeComplaint typeC) {
        return complaintRep.findByTypeC(typeC);    }

    public List<Complaint> findByStatusComplaint(StatusComplaint statusComplaint) {
        return complaintRep.findByTypeStatus(statusComplaint);

    }

    public List<Complaint> getComplaint() {
        return complaintRep.findAll();
    }

    @Override
    public List<Complaint> retrieveAllComplaint() {
        return complaintRep.findAll();
    }
    public Complaint retrieveComplaint(Long id ) {
        return complaintRep.findById(id).get();
    }





}
