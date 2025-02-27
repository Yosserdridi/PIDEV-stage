package com.example.back.repository;

import com.example.back.entities.Postulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostulationRepository extends JpaRepository<Postulation, Long> {


    // Query method to find postulations by idsujet
    List<Postulation> findByIntershipOffer_Idsujet(Long idsujet);



    // Find postulations by status
    List<Postulation> findByStatus(int status);


}
