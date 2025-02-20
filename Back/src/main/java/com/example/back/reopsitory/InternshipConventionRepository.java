package com.example.back.reopsitory;

import com.example.back.DTO.InternshipConventionDTO;
import com.example.back.entities.InternshipConvention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipConventionRepository extends JpaRepository<InternshipConvention, Long> {
    @Query("SELECT ic.id AS id, ic.companyName AS companyName, ic.startDate AS startDate, " +
            "ic.endDate AS endDate, ic.companyAddress AS companyAddress, ic.comanyContact AS companyContact, " +
            "ic.typeInternship AS typeInternship, ic.isValid AS isValid, s.firstName AS studentFirstName " +
            "FROM InternshipConvention ic " +
            "JOIN ic.student s")
    List<InternshipConventionDTO> findAllInternshipConventionsWithStudentFirstName();
}
