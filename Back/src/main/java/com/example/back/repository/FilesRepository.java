package com.example.back.repository;

import com.example.back.entities.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FilesRepository extends JpaRepository<Files, Long> {
    List<Files> findByNoteGreaterThan(float note);
    Optional<Files> findFirstByUser_IdAndNoteGreaterThan(Long userId, float note);

}
