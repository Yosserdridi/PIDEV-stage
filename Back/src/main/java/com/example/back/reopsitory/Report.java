package com.example.back.reopsitory;

import com.example.back.entities.Files;
import com.example.back.entities.InternshipPFE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.File;

@Repository
public interface Report extends JpaRepository<Files, Long> {



}
