package com.example.back.controllers;

import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Restitution;
import com.example.back.entities.TypeInternship;
import com.example.back.services.IPFEInternshipService;
import lombok.AllArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.LosslessFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
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
            @RequestParam(value = "signedConvention", required = false) MultipartFile signedConvention,
            @RequestParam(value = "signature", required = false) MultipartFile signature
    ) {
        InternshipPFE internshipPFE = new InternshipPFE();
        internshipPFE.setTitle(title);
        internshipPFE.setDescription(description);
        internshipPFE.setStartDate(startDate);
        internshipPFE.setEndDate(endDate);

        Path uploadPath = Paths.get("uploads");
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 📌 Save signature image file separately in the uploads folder
            if (signature != null && !signature.isEmpty()) {
                String sigFileName = UUID.randomUUID().toString() + "_signature.png";
                Path sigPath = uploadPath.resolve(sigFileName);
                Files.copy(signature.getInputStream(), sigPath, StandardCopyOption.REPLACE_EXISTING);
                internshipPFE.setSignaturePath(sigFileName); // Saving path in DB
            }

            // 📄 Handle signedConvention and add signature to the PDF
            if (signedConvention != null && !signedConvention.isEmpty() && signature != null && !signature.isEmpty()) {
                String originalPdfName = UUID.randomUUID().toString() + "_" + signedConvention.getOriginalFilename();
                Path originalPdfPath = uploadPath.resolve(originalPdfName);
                Files.copy(signedConvention.getInputStream(), originalPdfPath, StandardCopyOption.REPLACE_EXISTING);

                // Load PDF & signature image
                PDDocument document = PDDocument.load(originalPdfPath.toFile());
                BufferedImage signatureImage = ImageIO.read(signature.getInputStream());
                PDImageXObject pdImage = LosslessFactory.createFromImage(document, signatureImage);

                PDPage page = document.getPage(0);
                PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true);

                // ✍️ Draw text "Signature:"
                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 14);
                contentStream.newLineAtOffset(100, 190); // position
                contentStream.showText("Signature:");
                contentStream.endText();

                // 🖼️ Draw image below the text
                contentStream.drawImage(pdImage, 100, 100, 150, 80); // adjust position and size
                contentStream.close();

                // Save final PDF
                String signedPdfName = "signed_" + originalPdfName;
                Path signedPdfPath = uploadPath.resolve(signedPdfName);
                document.save(signedPdfPath.toFile());
                document.close();

                internshipPFE.setSignedConvention(signedPdfName);
            }

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        InternshipPFE savedInternshipPFE = pfeInternshipService.assignInternshipPFEToStudent(studentId, internshipPFE);
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
