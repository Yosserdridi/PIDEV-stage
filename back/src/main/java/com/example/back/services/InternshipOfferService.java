package com.example.back.services;

import com.example.back.entities.IntershipOffer;
import com.example.back.repository.InternshipOfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;


@Service
@AllArgsConstructor
public class InternshipOfferService implements IInternshipOfferservice {
    private final InternshipOfferRepository internshipOfferRepository;
    public static final String UPLOAD_DIR = "uploads/";


    public IntershipOffer addIntershipOffer(IntershipOffer intershipOffer) {
        if (intershipOffer.getTitle() == null) {
            throw new IllegalArgumentException("Title cannot be null");
        }


        List<IntershipOffer> matchingOffers = internshipOfferRepository
                .findByTitleAndTypeInternship(intershipOffer.getTitle(), intershipOffer.getTypeInternship());


        if (!matchingOffers.isEmpty()) {
            throw new IllegalArgumentException("An offer with the same title and type already exists!");
        }


        return internshipOfferRepository.save(intershipOffer);
    }


    public List<IntershipOffer> retrieveAllIntershipOffers() {
        return internshipOfferRepository.findAll(Sort.by(Sort.Order.desc("creationDate")));
    }


    public IntershipOffer retireIntershipOffer(Long id) {
        return internshipOfferRepository.findById(id).orElse(null);
    }


    public IntershipOffer updatePos(IntershipOffer id) {
        IntershipOffer existingOffer = internshipOfferRepository.findById(id.getIdsujet()).orElse(null);


        if (existingOffer != null) {
            if (id.getTitle() != null) existingOffer.setTitle(id.getTitle());
            if (id.getDescription() != null) existingOffer.setDescription(id.getDescription());
            if (id.getDuration() > 0) existingOffer.setDuration(id.getDuration());
            if (id.getLocation() != null) existingOffer.setLocation(id.getLocation());
            if (id.getRequirements() != null) existingOffer.setRequirements(id.getRequirements());
            if (id.getNumberOfStudents() > 0) existingOffer.setNumberOfStudents(id.getNumberOfStudents());
            if (id.getTypeInternship() != null) existingOffer.setTypeInternship(id.getTypeInternship());
            if (id.getCompanyname() != null) existingOffer.setCompanyname(id.getCompanyname());
            if (id.getCompanymail() != null) existingOffer.setCompanymail(id.getCompanymail());


            return internshipOfferRepository.save(existingOffer);
        }
        return null;
    }


    public void deleteIntershipOffer(Long id) {
        internshipOfferRepository.deleteById(id);
    }


    public String uploadImage(Long idsujet, MultipartFile file) {
        IntershipOffer offer = internshipOfferRepository.findById(idsujet)
                .orElseThrow(() -> new RuntimeException("Internship Offer not found"));


        String fileUrl = saveFile(file);
        System.out.println("✅ Image URL saved: " + fileUrl);


        offer.setImageUrl(fileUrl);
        internshipOfferRepository.save(offer);


        return fileUrl;
    }


    @Override
    public IntershipOffer getInternshipOfferWithImage(Long id) {
        IntershipOffer offer = internshipOfferRepository.findById(id).orElse(null);
        if (offer == null || offer.getImageUrl() == null) {
            return null;  // Return null if no offer or no image
        }
        return offer;  // Return the offer with the image URL
    }


    public String saveFile(MultipartFile file) {
        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }


            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, uniqueFileName);
            Files.write(filePath, file.getBytes());


            System.out.println("File saved at: " + filePath);


            return "http://localhost:9091/images/" + uniqueFileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }


}
