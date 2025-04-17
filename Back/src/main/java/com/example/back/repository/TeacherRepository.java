package com.example.back.repository;

import com.example.back.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    List<Teacher> findByDisponiblePourSoutenanceTrue();
    List<Teacher> findByDisponiblePourSoutenanceFalse();
    @Query("SELECT t FROM Teacher t WHERE t.disponiblePourSoutenance = true")
    List<Teacher> findCurrentlyAvailableTeachers();
    List<Teacher> findByFirstNameAndLastName(String firstName, String lastName);

}
