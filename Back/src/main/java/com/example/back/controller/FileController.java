package com.example.back.controller;


import com.example.back.entities.Files;
import com.example.back.entities.Journal;
import com.example.back.entities.SummerInternship;
import com.example.back.repository.FileRepository;
import com.example.back.repository.JournalRepository;
import com.example.back.repository.SummerInternshipRepository;
import com.example.back.services.FileServiceImpl;

import lombok.AllArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class FileController {




    FileRepository fileRepository;

    JournalRepository journalRepository;

    SummerInternshipRepository summerInternshipRepository;
    private final FileServiceImpl fileServiceimpl;


     //add file with assocaition avec journal
    /* @PostMapping(value = "/upload/{journalId}", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, String>> uploadFiles(
            @PathVariable Long journalId, // ID du Journal associé
            @RequestParam("report") MultipartFile reportFile,
            @RequestParam("certificate") MultipartFile certificateFile
    ) {
        // Sauvegarde des fichiers
        String reportFileName = fileServiceimpl.saveFile(reportFile);
        String certificateFileName = fileServiceimpl.saveFile(certificateFile);

        // Vérifier si le journal existe
        Optional<Journal> journalOptional = journalRepository.findById(journalId);
        if (journalOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Journal not found"));
        }


        // Associer les fichiers au Journal
        Files newFile = new Files();
        newFile.setReport(reportFileName);
        newFile.setInternship_Certifcate(certificateFileName);
        newFile.setJournal(journalOptional.get()); // Associer le journal

        fileRepository.save(newFile);

        // Réponse JSON
        Map<String, String> response = new HashMap<>();
        response.put("message", "Files uploaded successfully");
        response.put("reportFile", reportFileName);
        response.put("certificateFile", certificateFileName);

        return ResponseEntity.ok(response);
    }
*/

    @PostMapping(value = "/upload/{summerInternshipId}", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> uploadFiles(
            @PathVariable Long summerInternshipId,
            @RequestParam("report") MultipartFile reportFile,
            @RequestParam("certificate") MultipartFile certificateFile
    ) {
        // Vérification que les fichiers ne sont pas vides
        if (reportFile.isEmpty() || certificateFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Both report and certificate files are required"));
        }

        // Vérifier si le SummerInternship existe
        Optional<SummerInternship> internshipOptional = summerInternshipRepository.findById(summerInternshipId);
        if (internshipOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Summer Internship not found"));
        }

        // Sauvegarde des fichiers
        String reportFileName = fileServiceimpl.saveFile(reportFile);
        String certificateFileName = fileServiceimpl.saveFile(certificateFile);

        // Création de l'entité Files
        Files newFile = new Files();
        newFile.setReport(reportFileName);
        newFile.setInternship_Certifcate(certificateFileName);

        // Sauvegarde de l'entité Files avant association
        Files savedFile = fileRepository.save(newFile);

        // Association avec SummerInternship
        SummerInternship internship = internshipOptional.get();
        internship.setFiles(savedFile);
        summerInternshipRepository.save(internship);

        // Réponse JSON avec l'ID du fichier sauvegardé
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Files uploaded successfully");
        response.put("reportFile", reportFileName);
        response.put("certificateFile", certificateFileName);
        response.put("fileId", savedFile.getId());  // Add the ID of the saved file

        return ResponseEntity.ok(response);
    }









    @GetMapping("getAllFiles")
    public ResponseEntity<List<Files>> getAllFiles() {
        return ResponseEntity.ok((fileServiceimpl.getAllFiles()));
    }

    @GetMapping("getFileById/{id}")
    public ResponseEntity<Files> getFileById(@PathVariable Long id) {
        return ResponseEntity.ok(fileServiceimpl.getFileById(id));
    }

    @DeleteMapping("deleteFile/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) {
        fileServiceimpl.deleteFileById(id);
        return ResponseEntity.ok("File deleted successfully!");
    }
    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            // Suppose que les fichiers sont dans un dossier nommé 'uploads'
            Path filePath = Path.of("uploads").resolve(fileName).normalize();

            if (!filePath.toFile().exists()) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new UrlResource(filePath.toUri());

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }










}



































