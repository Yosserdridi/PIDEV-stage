package com.example.back.reopsitory;

import com.example.back.entities.Restitution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestitutionRepository extends JpaRepository<Restitution, Long> {
}
