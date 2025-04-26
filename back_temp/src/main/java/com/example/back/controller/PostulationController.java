package com.example.back.controller;

import com.example.back.entities.EmailRequest;
import com.example.back.entities.Postulation;
import com.example.back.services.IPostulationService;
import com.example.back.services.MailCheckService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostulationController {

    private static final String PDF_DIRECTORY = System.getProperty("user.dir") + "/uploads/pdfs/";

    @Autowired
    private MailCheckService emailService;

    @Autowired
    private IPostulationService postulationService;

    @GetMapping("/retrieve-all")
    public List<Postulation> retrieveAll() {
        return postulationService.retrieveAllPos();
    }


    @GetMapping("/student/{studentid}")
    public List<Postulation> getPostulationsByStudentId(@PathVariable int studentid) {
        return postulationService.getPostulationsByStudentId(studentid);
    }

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendMail(emailRequest.getToEmail(), emailRequest.getSubject(), emailRequest.getBody());
    }

    @GetMapping("/retrieve-pos/{id}")
    public Postulation retrievePos(@PathVariable("id") Long id) {
        return postulationService.retrievePos(id);
    }

    @PostMapping("/addPos")
    public Postulation addPos(@RequestBody Postulation pos, @RequestParam Long idsujet) {
        return postulationService.addPos(pos, idsujet);
    }

    @DeleteMapping("/remove/{id}")
    public void removePos(@PathVariable("id") Long id) {
        postulationService.deletePos(id);
    }

    @PutMapping("/modify-pos")
    public Postulation updatePos(@RequestBody Postulation pos) {
        return postulationService.updatePos(pos);
    }

    @GetMapping("/retrieve-by-idsujet/{idsujet}")
    public List<Postulation> retrievePostulationsByIdsujet(@PathVariable("idsujet") Long idsujet) {
        return postulationService.getPostulationsByIdsujet(idsujet);
    }

    @GetMapping("/retrieve-by-status")
    public List<Postulation> retrieveByStatus(@RequestParam int status) {
        return postulationService.retrievePostulationsByStatus(status);
    }

    // Accept postulation
    @PutMapping("/accept/{postulationId}")
    public void acceptPostulation(@PathVariable Long postulationId) {
        postulationService.acceptPostulation(postulationId);
    }

    // Reject postulation
    @PutMapping("/reject/{postulationId}")
    public void rejectPostulation(@PathVariable Long postulationId) {
        postulationService.rejectPostulation(postulationId);
    }

    @PutMapping("/{id}/updatePdf")
    public ResponseEntity<String> updatePdf(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false, defaultValue = "false") boolean deleteExistingPdf) {
        try {
            String fileName = postulationService.uploadPdf(id, file, deleteExistingPdf);
            return ResponseEntity.ok(fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/{id}/pdf")
    public ResponseEntity<Resource> getPdf(@PathVariable Long id) {
        try {
            Postulation postulation = postulationService.getPostulationWithPdf(id);
            if (postulation.getPdfUrl() == null) {
                System.out.println("No PDF URL found for postulation ID: " + id);
                return ResponseEntity.notFound().build();
            }

            Path filePath = Paths.get(PDF_DIRECTORY).resolve(postulation.getPdfUrl()).normalize();
            System.out.println("Postulation PDF URL: " + postulation.getPdfUrl());
            System.out.println("Looking for file at: " + filePath.toAbsolutePath());

            if (!Files.exists(filePath)) {
                System.out.println("File does not exist at path: " + filePath.toAbsolutePath());
                return ResponseEntity.notFound().build();
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + resource.getFilename() + " ")
                        .body(resource);
            } else {
                System.out.println("File is not readable");
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }


}

