package com.example.back.repository;

import com.example.back.entities.Soutenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface SoutenanceRep extends JpaRepository<Soutenance, Integer> {
    boolean existsByFiles_User_Id(Long userId);
    List<Soutenance> findByDateSoutenaceAndBlocAndSalleNumberAndHourSoutenceBetween(
            Date dateSoutenace,
            String bloc,
            int salleNumber,
            LocalTime start,
            LocalTime end
    );
    Optional<Soutenance> findBySalleNumberAndDateSoutenaceAndHourSoutenceBetween(
            int salleNumber, Date date, LocalTime start, LocalTime end);
}