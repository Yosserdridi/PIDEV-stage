package com.example.back.repository;

import com.example.back.entities.Soutenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface soutenancerep extends JpaRepository<Soutenance, Integer> {
}
