package com.example.back.controller;


import com.example.back.entities.Files;
import com.example.back.entities.Journal;
import com.example.back.entities.SummerInternship;
import com.example.back.repository.FileRepository;
import com.example.back.repository.SummerInternshipRepository;
import com.example.back.services.FileService;
import com.example.back.services.FileServiceImpl;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class FileController {




    FileRepository fileRepository;

    SummerInternshipRepository summerInternshipRepository;
    private final FileServiceImpl fileServiceimpl;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, String>> uploadFiles(
            @RequestParam("report") MultipartFile reportFile,
            @RequestParam("certificate") MultipartFile certificateFile
          ) {  // Change here to use @PathVariable

        // Save report file and certificate file using the service
        String reportFileName = fileServiceimpl.saveFile(reportFile); // Save report file
        String certificateFileName = fileServiceimpl.saveFile(certificateFile); // Save certificate file

        // Save file information to the database
        Files newFile = new Files();
        newFile.setReport(reportFileName);
        newFile.setInternship_Certifcate(certificateFileName); // Fixed the typo in field name
        fileRepository.save(newFile);



        // Return a JSON response with the file details
        Map<String, String> response = new HashMap<>();
        response.put("message", "Files uploaded successfully");
        response.put("reportFile", reportFileName);
        response.put("certificateFile", certificateFileName);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        Resource resource = fileServiceimpl.loadFileAsResource(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
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








}



































