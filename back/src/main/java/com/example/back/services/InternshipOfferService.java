package com.example.back.services;


import com.example.back.entities.IntershipOffer;
import com.example.back.repository.InternshipOfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InternshipOfferService implements IInternshipOfferservice {
    InternshipOfferRepository internshipOfferRepository;



    public IntershipOffer addIntershipOffer(IntershipOffer intershipOffer) {
        // Check if the title is null
        if (intershipOffer.getTitle() == null) {
            throw new IllegalArgumentException("Title cannot be null");
        }

        // Check if an internship with the same title & type exists
        List<IntershipOffer> matchingOffers = internshipOfferRepository
                .findByTitleAndTypeInternship(intershipOffer.getTitle(), intershipOffer.getTypeInternship());

        if (!matchingOffers.isEmpty()) {
            throw new IllegalArgumentException("An offer with the same title and type already exists!");
        }

        // Save the offer if no duplicates are found
        return internshipOfferRepository.save(intershipOffer);
    }




    // public IntershipOffer addIntershipOffer(IntershipOffer intershipOffer) {
   //     return internshipOfferRepository.save(intershipOffer);
    // }

    public List<IntershipOffer> retrieveAllIntershipOffers() {
        List<IntershipOffer> intershipOffers = internshipOfferRepository.findAll();
        return intershipOffers;
    }

    public IntershipOffer retireIntershipOffer(Long id) {
        return internshipOfferRepository.findById(id).get();
    }





    public IntershipOffer updatePos(IntershipOffer id) {
        // Retrieve the existing IntershipOffer from the database
        IntershipOffer existingOffer = internshipOfferRepository.findById(id.getIdsujet()).orElse(null);

        if (existingOffer != null) {
            // Update only the changed fields
            if (id.getTitle() != null && !id.getTitle().equals(existingOffer.getTitle())) {
                existingOffer.setTitle(id.getTitle());
            }
            if (id.getDescription() != null && !id.getDescription().equals(existingOffer.getDescription())) {
                existingOffer.setDescription(id.getDescription());
            }
            if (id.getDuration() > 0) {
                existingOffer.setDuration(id.getDuration());
            }
            if (id.getLocation() != null && !id.getLocation().equals(existingOffer.getLocation())) {
                existingOffer.setLocation(id.getLocation());
            }
            if (id.getRequirements() != null && !id.getRequirements().equals(existingOffer.getRequirements())) {
                existingOffer.setRequirements(id.getRequirements());
            }
            if (id.getNumberOfStudents() > 0) {
                existingOffer.setNumberOfStudents(id.getNumberOfStudents());
            }
            if (id.getTypeInternship() != null && !id.getTypeInternship().equals(existingOffer.getTypeInternship())) {
                existingOffer.setTypeInternship(id.getTypeInternship());
            }
            if (id.getCompanyname() != null && !id.getCompanyname().equals(existingOffer.getCompanyname())) {
                existingOffer.setCompanyname(id.getCompanyname());
            }
            if (id.getCompanymail() != null && !id.getCompanymail().equals(existingOffer.getCompanymail())) {
                existingOffer.setCompanymail(id.getCompanymail());
            }

            // Save the updated IntershipOffer
            return internshipOfferRepository.save(existingOffer);
        }

        // Return null or handle the case where the IntershipOffer doesn't exist
        return existingOffer;
    }


    public void deleteIntershipOffer(Long id) {
        internshipOfferRepository.deleteById(id);

    }



}
