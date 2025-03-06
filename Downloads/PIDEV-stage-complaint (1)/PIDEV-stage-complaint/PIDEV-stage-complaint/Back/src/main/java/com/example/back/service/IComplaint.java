package com.example.back.service;

import com.example.back.entities.Complaint;
import com.example.back.entities.StatusComplaint;
import com.example.back.entities.TypeComplaint;

import java.util.List;
import java.util.Map;

public interface IComplaint {
    Complaint addComplaint(Complaint Complaint);
    List<Complaint> retrieveAllComplaint();
    Complaint retrieveComplaint(Long id);

    Complaint updateComplaint(Complaint complaint);

    void deleteComplaint(Long id);

    Complaint findByIdComplaint(Long id);
    public Map<String, Long> getComplaintsPerDay();




    List<Complaint> findByTypeC(TypeComplaint typeC);

    List<Complaint> findByStatusComplaint(StatusComplaint statusComplaint);

    List<Complaint> getComplaint();
}
