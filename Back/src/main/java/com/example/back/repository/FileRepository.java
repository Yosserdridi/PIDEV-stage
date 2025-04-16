package com.example.back.repository;


import com.example.back.entities.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<Files,Long> {

    @Query(value = "SELECT * FROM files", nativeQuery = true)
    List<Files> getAllFiles();



}
