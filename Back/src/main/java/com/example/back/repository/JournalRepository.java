package com.example.back.repository;

import com.example.back.entities.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {

    @Query("SELECT j FROM Journal j WHERE j.file.id = :fileId")
    Journal findByFileId(@Param("fileId") Long fileId);
}
