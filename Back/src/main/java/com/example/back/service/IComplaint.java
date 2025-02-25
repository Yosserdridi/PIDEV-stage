package com.example.back.service;

import com.example.back.entities.Complaint;
import com.example.back.entities.Postulation;
import com.example.back.entities.StatusComplaint;
import com.example.back.entities.TypeComplaint;

import java.util.List;
import java.util.Optional;

public interface IComplaint {
    Complaint addComplaint(Complaint Complaint);
    List<Complaint> retrieveAllComplaint();
    Complaint retrieveComplaint(Long id);

    Complaint updateComplaint(Complaint complaint);

    void deleteComplaint(Long id);




    List<Complaint> findByTypeC(TypeComplaint typeC);

    List<Complaint> findByStatusComplaint(StatusComplaint statusComplaint);

    List<Complaint> getComplaint();
}
