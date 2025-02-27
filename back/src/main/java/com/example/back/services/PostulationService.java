package com.example.back.services;


import com.example.back.entities.IntershipOffer;
import com.example.back.entities.Postulation;
import com.example.back.repository.InternshipOfferRepository;
import com.example.back.repository.PostulationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class PostulationService implements IPostulationService {

    private final InternshipOfferRepository internshipOfferRepository;
    PostulationRepository postulationRepository;


    public Postulation addPos(Postulation postulation, Long idsujet) {
        // Fetch the IntershipOffer using the idsujet (the ID of the internship offer)
        IntershipOffer intershipOffer = internshipOfferRepository.findById(idsujet)
                .orElseThrow(() -> new RuntimeException("IntershipOffer not found"));

        // Set the fetched intershipOffer to the postulation
        postulation.setIntershipOffer(intershipOffer);

        // Save and return the postulation
        return postulationRepository.save(postulation);
    }



    public List<Postulation> retrieveAllPos() {
       List<Postulation> postulations = postulationRepository.findAll();
       return postulations;
    }




    public Postulation retrievePos(Long id ) {
        return postulationRepository.findById(id).get();
    }

    public Postulation updatePos(Postulation pos) {
        // Retrieve the existing postulation from the database
        Postulation existingPostulation = postulationRepository.findById(pos.getId()).orElse(null);

        if (existingPostulation != null) {
            // Update only the changed fields

            if (pos.getPostulationDate() != null) {
                existingPostulation.setPostulationDate(pos.getPostulationDate());
            }
            if (pos.getComment() != null && !pos.getComment().equals(existingPostulation.getComment())) {
                existingPostulation.setComment(pos.getComment());
            }

            // Save the updated postulation
            return postulationRepository.save(existingPostulation);
        }

        // Return null or handle the case where the postulation doesn't exist
        return null;
    }


    public void deletePos(Long id) {
           postulationRepository.deleteById(id);


    }



    // retrieve postulations by idsujet
    @Override
    public List<Postulation> getPostulationsByIdsujet(Long idsujet) {
        return postulationRepository.findByIntershipOffer_Idsujet(idsujet);
    }




    @Override
    public List<Postulation> retrievePostulationsByStatus(int status) {
        return postulationRepository.findByStatus(status);  // Assuming you have this method in your repository
    }



}
