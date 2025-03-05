package com.example.back.services;


import com.example.back.entities.IntershipOffer;
import com.example.back.entities.Postulation;
import com.example.back.repository.InternshipOfferRepository;
import com.example.back.repository.PostulationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
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
        // Sort postulations by postulationDate in descending order
        return postulationRepository.findAll(Sort.by(Sort.Order.desc("postulationDate")));
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


    public void acceptPostulation(Long postulationId) {
        // Find the postulation
        Postulation postulation = postulationRepository.findById(postulationId)
                .orElseThrow(() -> new RuntimeException("Postulation not found with id: " + postulationId));

        // Get the related InternshipOffer (subject)
        IntershipOffer intershipOffer = postulation.getIntershipOffer();

        // Set status to "Accepted"
        postulation.setStatus(1);
        postulationRepository.save(postulation);

        // Count the number of accepted postulations for this subject
        long acceptedCount = postulationRepository.countByIntershipOfferAndStatus(intershipOffer, 1);

        // If the required number of students is reached, reject all remaining pending postulations
        if (acceptedCount >= intershipOffer.getNumberOfStudents()) {
            List<Postulation> pendingPostulations = postulationRepository.findByIntershipOfferAndStatus(intershipOffer, 0);

            for (Postulation pending : pendingPostulations) {
                pending.setStatus(2); // Reject them
                postulationRepository.save(pending);
            }
        }
    }

    public void rejectPostulation(Long postulationId) {
        Postulation postulation = postulationRepository.findById(postulationId)
                .orElseThrow(() -> new RuntimeException("Postulation not found with id: " + postulationId));
        postulation.setStatus(2); // Set status to "Rejected"
        postulationRepository.save(postulation); // Save the updated postulation
    }




    @Override
    public List<Postulation> retrievePostulationsByStatus(int status) {
        return postulationRepository.findByStatus(status);  // Assuming you have this method in your repository
    }



}
