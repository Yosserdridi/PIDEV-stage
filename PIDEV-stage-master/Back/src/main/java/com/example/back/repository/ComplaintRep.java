package com.example.back.repository;

import com.example.back.entities.Complaint;
import com.example.back.entities.StatusComplaint;
import com.example.back.entities.TypeComplaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface ComplaintRep extends JpaRepository<Complaint, Long> {
    List<Complaint> findByTypeStatus(StatusComplaint status);

    List<Complaint> findByTypeC(TypeComplaint typeC);
}

