package com.example.back.services;


import com.example.back.entities.Company;
import com.example.back.entities.IntershipOffer;
import com.example.back.entities.Postulation;
import com.example.back.entities.Student;
import com.example.back.repository.InternshipOfferRepository;
import com.example.back.repository.PostulationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class PostulationService implements IPostulationService {
     private final InternshipOfferRepository internshipOfferRepository;
    PostulationRepository postulationRepository;
    UserService userService;
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/pdfs/";

    @Autowired
    private MailCheckService emailService;

    public Postulation addPos(Postulation postulation, Long idsujet) {
        // Fetch the IntershipOffer using the idsujet (the ID of the internship offer)
        IntershipOffer intershipOffer = internshipOfferRepository.findById(idsujet)
                .orElseThrow(() -> new RuntimeException("IntershipOffer not found"));

        // Set the fetched intershipOffer to the postulation
        postulation.setIntershipOffer(intershipOffer);
        postulation.setStudentid(1L);
        // Save and return the postulation
        return postulationRepository.save(postulation);
    }



    public List<Postulation> retrieveAllPos() {
        // Sort postulations by postulationDate in descending order
        return postulationRepository.findAll(Sort.by(Sort.Order.desc("postulationDate")));
    }


    public List<Postulation> getPostulationsByStudentId(int studentid) {
        return postulationRepository.findBystudentidOrderByPostulationDateDesc(studentid);
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
        sendConfirmationEmail(postulation , postulation.getStudentid());
        postulationRepository.save(postulation);

        // Count the number of accepted postulations for this subject
        long acceptedCount = postulationRepository.countByIntershipOfferAndStatus(intershipOffer, 1);

        // If the required number of students is reached, reject all remaining pending postulations
        if (acceptedCount >= intershipOffer.getNumberOfStudents()) {
            List<Postulation> pendingPostulations = postulationRepository.findByIntershipOfferAndStatus(intershipOffer, 0);

            for (Postulation pending : pendingPostulations) {
                pending.setStatus(2); // Reject them
                sendRejectionEmail(postulation , 1L);
                postulationRepository.save(pending);
            }
        }
    }

    public void rejectPostulation(Long postulationId) {
        Postulation postulation = postulationRepository.findById(postulationId)
                .orElseThrow(() -> new RuntimeException("Postulation not found with id: " + postulationId));
        postulation.setStatus(2); // Set status to "Rejected"
        sendRejectionEmail(postulation , postulation.getStudentid());
        postulationRepository.save(postulation); // Save the updated postulation
    }

    @Override
    public List<Postulation> retrievePostulationsByStatus(int status) {
        return postulationRepository.findByStatus(status);  // Assuming you have this method in your repository
    }






    private void sendConfirmationEmail(Postulation postulation, Long studentId) {
        Student student = userService.getStudentById(studentId);
        Company company = userService.getCompanyById(postulation.getIntershipOffer().getIdcompany());

        if (student != null) {
            String toEmail = student.getEmail();
            String subject = "Confirmation of your internship application";
            String body = "Hello " + student.getFirstName() + " " + student.getLastName() +
                    ", your internship application for the company " + company.getCompanyName() +
                    " has been accepted.";
            emailService.sendMail(toEmail, subject, body);
        } else {
            System.out.println("Student not found with ID: " + studentId);
        }
    }

    private void sendRejectionEmail(Postulation postulation, Long studentId) {
        Student student = userService.getStudentById(studentId);
         Company company = userService.getCompanyById(postulation.getIntershipOffer().getIdcompany());

        if (student != null) {
            String toEmail = student.getEmail();
            String subject = "Rejection of your internship application";
            String body = "Hello " + student.getFirstName() + " " + student.getLastName() +
                    ", your internship application for the company " + company.getCompanyName() +
                    " has been rejected.";
            emailService.sendMail(toEmail, subject, body);
        } else {
            System.out.println("Student not found with ID: " + studentId);
        }
    }




    @Override
    public String uploadPdf(Long postulationId, MultipartFile file, boolean deleteExistingPdf) {
        validatePdfFile(file);

        Postulation postulation = postulationRepository.findById(postulationId)
                .orElseThrow(() -> new RuntimeException("Postulation not found"));

        if (deleteExistingPdf && postulation.getPdfUrl() != null) {
            deletePdfFile(postulation.getPdfUrl());
        }

        String fileName = saveFile(file);
        postulation.setPdfUrl(fileName);
        postulationRepository.save(postulation);

        return fileName;
    }
    private void validatePdfFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("PDF file is empty");
        }
        if (!"application/pdf".equals(file.getContentType())) {
            throw new RuntimeException("Only PDF files are allowed");
        }
    }
    private String saveFile(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID().toString() + "" + file.getOriginalFilename().replace(" ", "_");
            Path filePath = uploadPath.resolve(fileName);
            System.out.println("Saving file to: " + filePath.toAbsolutePath());

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save PDF file", e);
        }
    }
    private void deletePdfFile(String fileName) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            System.out.println("Deleting file: " + filePath.toAbsolutePath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete PDF file", e);
        }
    }
    @Override
    public Postulation getPostulationWithPdf(Long id) {
        return postulationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Postulation not found"));
    }





}


