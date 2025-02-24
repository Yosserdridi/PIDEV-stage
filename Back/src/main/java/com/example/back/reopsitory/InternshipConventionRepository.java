package com.example.back.reopsitory;

import com.example.back.DTO.InternshipConventionDTO;
import com.example.back.entities.InternshipConvention;
import com.example.back.entities.TypeInternship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InternshipConventionRepository extends JpaRepository<InternshipConvention, Long> {

    @Query("SELECT ic.id FROM InternshipConvention ic JOIN Student s ON ic MEMBER OF s.internshipConventions WHERE s.id = :studentId AND ic.typeInternship = :typeInternship")
    Optional<Long> findPFEInternshipConventionIdByStudentId(@Param("studentId") Long studentId, @Param("typeInternship") TypeInternship typeInternship);

    @Query("SELECT ic FROM InternshipConvention ic WHERE ic.typeInternship = :typeInternship AND EXISTS (SELECT 1 FROM Student s JOIN s.internshipConventions ic2 WHERE s.id = :studentId AND ic2 = ic)")
    Optional<InternshipConvention> findByStudentIdAndTypeInternship(@Param("studentId") Long studentId, @Param("typeInternship") TypeInternship typeInternship);

}
