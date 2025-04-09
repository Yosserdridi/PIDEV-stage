package com.example.back.controller;

import com.example.back.entities.Postulation;
import com.example.back.services.IPostulationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
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

    @Autowired
    private IPostulationService postulationService;

    @GetMapping("/retrieve-all")
    public List<Postulation> retrieveAll() {
        return postulationService.retrieveAllPos();
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
    @PostMapping("/{id}/uploadPdf")
    public ResponseEntity<Map<String, String>> uploadPdf(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String pdfUrl = postulationService.uploadPdf(id, file);

            // Return JSON response with PDF URL
            Map<String, String> response = new HashMap<>();
            response.put("pdfUrl", pdfUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error uploading PDF: " + e.getMessage());

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }


    @GetMapping("/{id}/pdf")
    public ResponseEntity<UrlResource> getPdf(@PathVariable Long id) {
        Postulation postulation = postulationService.getPostulationWithPdf(id);

        if (postulation == null || postulation.getPdfUrl() == null) {
            return ResponseEntity.notFound().build();
        }

        try {

            String fileName = postulation.getPdfUrl().substring(postulation.getPdfUrl().lastIndexOf('/') + 1);
            Path pdfPath = Paths.get("uploads/pdfs/").resolve(fileName);

            UrlResource resource = new UrlResource(pdfPath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF) // Set content type to PDF
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

