package com.example.back.reopsitory;

import com.example.back.entities.InternshipPFE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PFEInternshipRepository extends JpaRepository<InternshipPFE, Long> {
    @Query("SELECT i FROM InternshipPFE i WHERE i.id NOT IN "
            + "(SELECT i2.id FROM Teacher t JOIN t.internshipPFEs i2)")
    List<InternshipPFE> findUnassignedInternships();
}
