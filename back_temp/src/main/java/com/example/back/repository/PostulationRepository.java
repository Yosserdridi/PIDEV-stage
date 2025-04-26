package com.example.back.repository;

import com.example.back.entities.IntershipOffer;
import com.example.back.entities.Postulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Repository
public interface PostulationRepository extends JpaRepository<Postulation, Long> {


    // Query method to find postulations by idsujet
    List<Postulation> findByIntershipOffer_Idsujet(Long idsujet);



    // Find postulations by status
    List<Postulation> findByStatus(int status);

    long countByIntershipOfferAndStatus(IntershipOffer intershipOffer, int status);

    // Trouver toutes les postulations en attente (status = 0) pour un sujet donné
    List<Postulation> findByIntershipOfferAndStatus(IntershipOffer intershipOffer, int status);


    List<Postulation> findBystudentidOrderByPostulationDateDesc(int studentid);


}
