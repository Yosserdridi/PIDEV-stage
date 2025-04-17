package com.example.back.repository;

import com.example.back.entities.CompanyAgent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyAgentRepository extends JpaRepository<CompanyAgent, Long> {
}
