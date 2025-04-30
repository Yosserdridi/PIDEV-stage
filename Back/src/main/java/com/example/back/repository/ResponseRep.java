package com.example.back.repository;



import com.example.back.entities.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;


@Repository


public interface ResponseRep extends JpaRepository<Response, Long> {








    List<Response> findByComplaint_Id(Long complaintId);
}




