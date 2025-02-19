package com.example.back.reopsitory;

import com.example.back.entities.InternshipPFE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PFEInternshipRepository extends JpaRepository<InternshipPFE, Long> {
}
