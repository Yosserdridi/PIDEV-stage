package com.example.back.repository;

import com.example.back.entities.InternshipConvention;
import com.example.back.entities.Student;
import com.example.back.entities.TypeInternship;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConventionRepository extends JpaRepository<InternshipConvention,Long> {

    List<InternshipConvention> findAllByStudentId(Long studentId);
    List<InternshipConvention> findByIsValidTrue();
    List<InternshipConvention> findByIsValidFalse();
    boolean existsByStudentAndTypeInternshipAndIsValidTrue(Student student, TypeInternship typeInternship);




}