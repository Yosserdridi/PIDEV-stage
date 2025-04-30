package com.example.back.services;



import com.example.back.entities.Company;
import com.example.back.entities.IntershipOffer;
import com.example.back.entities.Postulation;
import com.example.back.entities.Student;
import com.example.back.repository.InternshipOfferRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    UserService userService;
    @Autowired
    private MailCheckService emailService;

    public IntershipOffer addIntershipOffer(IntershipOffer intershipOffer) {
        if (intershipOffer.getTitle() == null) {
            throw new IllegalArgumentException("Title cannot be null");
        }

        List<IntershipOffer> matchingOffers = internshipOfferRepository
                .findByTitleAndTypeInternship(intershipOffer.getTitle(), intershipOffer.getTypeInternship());

        if (!matchingOffers.isEmpty()) {
            throw new IllegalArgumentException("An offer with the same title and type already exists!");
        }

        intershipOffer.setIdcompany(1L);
        sendNewSubjectEmail(intershipOffer , 1L);
        return internshipOfferRepository.save(intershipOffer);
    }




    private void sendNewSubjectEmail(IntershipOffer intershipOffer, Long studentId) {
        Student student = userService.getStudentById(studentId);
        Company company = userService.getCompanyById(1L);

        if (student != null) {
            String toEmail = student.getEmail();
            String subject = "New Internship Offer Available";
            String body = "Hello " + student.getFirstName() + " " + student.getLastName() +
                    ",\n\nA new internship offer has been added for the company '" + company.getCompanyName() +
                    "' with the title '" + intershipOffer.getTitle() + "'.\n\nCheck it out and apply if you're interested!";

            emailService.sendMail(toEmail, subject, body);
        } else {
            System.out.println("Student not found with ID: " + studentId);
        }
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
            return null;
        }
        return offer;
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


    public void deleteImageFile(String imageUrl) {
        if (imageUrl != null && imageUrl.startsWith("http://localhost:9091/images/")) {
            String filename = imageUrl.replace("http://localhost:9091/images/", "");
            Path filePath = Paths.get(UPLOAD_DIR, filename);
            try {
                Files.deleteIfExists(filePath);
                System.out.println("🗑️ Image deleted: " + filePath);
            } catch (IOException e) {
                System.err.println("❌ Failed to delete image: " + e.getMessage());
            }
        }
    }
    public String updateImage(Long idsujet, MultipartFile file) {
        // Find the offer by ID
        IntershipOffer offer = internshipOfferRepository.findById(idsujet)
                .orElseThrow(() -> new RuntimeException("Internship Offer not found"));

        // If there's already an image, delete it from the file system
        if (offer.getImageUrl() != null) {
            deleteFile(offer.getImageUrl());
        }

        // Save the new image and update the offer
        String newImageUrl = saveFile(file);
        offer.setImageUrl(newImageUrl);
        internshipOfferRepository.save(offer);

        return newImageUrl;
    }

    public void deleteImage(Long idsujet) {
        // Find the offer by ID
        IntershipOffer offer = internshipOfferRepository.findById(idsujet)
                .orElseThrow(() -> new RuntimeException("Internship Offer not found"));

        // If there's an image, delete it from the file system
        if (offer.getImageUrl() != null) {
            deleteFile(offer.getImageUrl());
            offer.setImageUrl(null);  // Remove the image URL from the offer
            internshipOfferRepository.save(offer);  // Save the updated offer without the image
        }
    }

    private void deleteFile(String imageUrl) {
        try {
            // Extract the file name from the URL
            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

            // Construct the path to the file
            Path filePath = Paths.get(UPLOAD_DIR, fileName);

            // Delete the file from the system
            Files.delete(filePath);

            System.out.println("File deleted: " + filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file", e);
        }
    }

}
