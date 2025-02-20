package com.example.back.service;

import com.example.back.entities.Complaint;
import com.example.back.entities.StatusComplaint;
import com.example.back.entities.TypeComplaint;

import java.util.List;

public interface IComplaint {
    Complaint addComplaint(Complaint Complaint);

    Complaint updateComplaint(Complaint complaint);

    void deleteComplaint(Long id);

    List<Complaint> getComplaint();

    Complaint GetComplaintById(Long id);

    List<Complaint> findByTypeC(TypeComplaint typeC);

    List<Complaint> findByStatusComplaint(StatusComplaint statusC);
}
