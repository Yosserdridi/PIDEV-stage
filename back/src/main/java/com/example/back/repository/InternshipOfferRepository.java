package com.example.back.repository;

import com.example.back.entities.IntershipOffer;
import com.example.back.entities.TypeInternship;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InternshipOfferRepository extends JpaRepository <IntershipOffer, Long> {
    IntershipOffer findByTitle(String title);
    List<IntershipOffer> findByTitleAndTypeInternship(String title, TypeInternship typeInternship);
    List<IntershipOffer> findAll(Sort sort);
}
