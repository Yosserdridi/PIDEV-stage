package com.example.back.controllers;

import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Restitution;
import com.example.back.entities.TypeInternship;
import com.example.back.services.IPFEInternshipService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/PfeInternship")
public class PFEInternshipController {
    IPFEInternshipService pfeInternshipService;
    IPFEInternshipService ipfeInternshipService;

    @PostMapping("/add")
    public InternshipPFE create(@RequestBody InternshipPFE internshipPFE) {
        return pfeInternshipService.save(internshipPFE);
    }

    @GetMapping("/getAll")
    public List<InternshipPFE> getAll() {
        return pfeInternshipService.getAll();
    }

    @GetMapping("/getById/{id}")
    public InternshipPFE getById(@PathVariable Long id) {
        return pfeInternshipService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        pfeInternshipService.delete(id);
    }


/*
    @PostMapping("/{studentId}/assign-internshipPFE")
    public ResponseEntity<InternshipPFE> assignInternshipPFE(
            @PathVariable Long studentId,
            @RequestBody InternshipPFE internshipPFE) {

        InternshipPFE savedInternshipPFE = pfeInternshipService.assignInternshipPFEToStudent(studentId, internshipPFE);
        return ResponseEntity.ok(savedInternshipPFE);
    }
*/


    @PostMapping("/{studentId}/assign-internshipPFE")
    public ResponseEntity<InternshipPFE> assignInternshipPFE(
            @PathVariable Long studentId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(value = "signedConvention", required = false) MultipartFile signedConvention) {

        InternshipPFE internshipPFE = new InternshipPFE();
        internshipPFE.setTitle(title);
        internshipPFE.setDescription(description);
        internshipPFE.setStartDate(startDate);
        internshipPFE.setEndDate(endDate);

        if (signedConvention != null && !signedConvention.isEmpty()) {
            try {
                // Generate unique filename
                String fileName = UUID.randomUUID().toString() + "_" + signedConvention.getOriginalFilename();
                Path uploadPath = Paths.get("uploads");

                // Ensure the directory exists
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                Files.copy(signedConvention.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                internshipPFE.setSignedConvention(fileName); // Store only filename in DB
                System.out.println("Signed convention saved with filename: " + fileName);

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            System.out.println("No signed convention uploaded.");
        }

        InternshipPFE savedInternshipPFE = pfeInternshipService.assignInternshipPFEToStudent(studentId, internshipPFE);
        System.out.println("Internship assigned to student ID: " + studentId + " with Internship ID: " + savedInternshipPFE.getId());

        return ResponseEntity.ok(savedInternshipPFE);
    }



    // POST method to associate an InternshipPFE with an InternshipConvention
    @PostMapping("/{internshipConventionId}/internshipPFE")
    public ResponseEntity<InternshipPFE> addInternshipConvention(
            @PathVariable Long internshipConventionId,
            @RequestBody InternshipPFE internshipPFE) {

        // Call the service method to add the InternshipPFE and associate it with an InternshipConvention
        InternshipPFE savedInternshipPFE = ipfeInternshipService.addInternshipConvention(internshipConventionId, internshipPFE);

        // Return the saved InternshipPFE with a CREATED status
        return ResponseEntity.status(HttpStatus.CREATED).body(savedInternshipPFE);
    }

    // POST method to associate a Restitution with an InternshipPFE
    @PostMapping("/{pfeInternshipId}/restitution")
    public ResponseEntity<Restitution> addRestitution(
            @PathVariable Long pfeInternshipId,
            @RequestBody Restitution restitution) {

        // Call the service method to add the Restitution to the InternshipPFE
        Restitution savedRestitution = pfeInternshipService.addRestitution(pfeInternshipId, restitution);

        // Return the saved Restitution with a CREATED status
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRestitution);
    }

    @PostMapping("/assign-internships_to-teachers")
    public String assignInternshipsToTeachers() {
        pfeInternshipService.assignInternshipsToTeachers();
        return "Internships successfully assigned to teachers!";
    }


    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {
        Path filePath = Paths.get("uploads").resolve(filename);
        try {
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                System.out.println("File not found: " + filePath.toString()); // ✅ Debugging

                return ResponseEntity.notFound().build();
            }

            // Determine the content type dynamically
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
            System.out.println("Serving file: " + filename + " with type: " + contentType); // ✅ Debugging

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .cacheControl(CacheControl.noCache().mustRevalidate()) // Prevents caching issues
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);

        } catch (IOException e) { // Both MalformedURLException and IOException are caught here
            System.out.println("Error loading file: " + e.getMessage()); // ✅ Debugging

            return ResponseEntity.internalServerError().build();
        }
    }

/*   @GetMapping("/student/{studentId}/internshipPFE")
    public ResponseEntity<InternshipPFE> getInternshipPFEForStudent(
            @PathVariable Long studentId,
            @RequestParam TypeInternship typeInternship) {
        // Get the InternshipPFE for the student and typeInternship
        InternshipPFE internshipPFE = ipfeInternshipService.getInternshipPFEForStudent(studentId, typeInternship);
        return ResponseEntity.ok(internshipPFE);
    }*/
}
