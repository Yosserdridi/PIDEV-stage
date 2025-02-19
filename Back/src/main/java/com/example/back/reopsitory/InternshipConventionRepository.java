package com.example.back.reopsitory;

import com.example.back.entities.InternshipConvention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternshipConventionRepository extends JpaRepository<InternshipConvention, Long> {
}
