package com.example.back.repository;


import com.example.back.entities.InternshipConvention;
import com.example.back.entities.SummerInternship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SummerInternshipRepository extends JpaRepository<SummerInternship, Long> {
    SummerInternship findByInternshipConvention(InternshipConvention convention);

}
