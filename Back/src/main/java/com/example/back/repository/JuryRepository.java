package com.example.back.repository;
import com.example.back.entities.Jury;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JuryRepository extends JpaRepository<Jury, Long> {

    @Query("SELECT CASE WHEN COUNT(j) > 0 THEN true ELSE false END FROM Jury j WHERE j.nom = :nom AND :requestedTime IN elements(j.disponibilites)")
    boolean isJuryAvailableAt(String nom, LocalDateTime requestedTime);
    boolean existsByNomAndDisponibilitesAfter(String nom, LocalDateTime time);

}


