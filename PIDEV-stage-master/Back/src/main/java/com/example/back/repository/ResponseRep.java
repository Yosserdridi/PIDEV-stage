package com.example.back.repository;

import com.example.back.entities.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ResponseRep extends JpaRepository<Response, Long> {

}

