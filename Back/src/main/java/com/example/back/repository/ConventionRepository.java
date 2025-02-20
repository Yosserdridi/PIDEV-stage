package com.example.back.repository;

import com.example.back.entities.InternshipConvention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConventionRepository extends JpaRepository<InternshipConvention,Long> {
}
