package com.example.back.controller;

import com.example.back.entities.IntershipOffer;
import com.example.back.services.IInternshipOfferservice;
import com.example.back.services.InternshipOfferService;
import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.example.back.services.InternshipOfferService.UPLOAD_DIR;


@RestController
@AllArgsConstructor
@RequestMapping("/offer")
@CrossOrigin(origins = "http://localhost:4200")
public class InternshipOfferController {

    private final IInternshipOfferservice iInternshipOfferservice;
    private final InternshipOfferService internshipOfferService;

    @GetMapping("/retrieve-all")
    public List<IntershipOffer> retrieveAllIntershipOffers() {
        return iInternshipOfferservice.retrieveAllIntershipOffers();
    }

    @GetMapping("/retrieve-off/{id}")
    public IntershipOffer retireIntershipOffer(@PathVariable("id") Long id) {
        return iInternshipOfferservice.retireIntershipOffer(id);
    }

    @PostMapping("/addoff")
    public IntershipOffer addIntershipOffer(@RequestBody IntershipOffer off) {
        return iInternshipOfferservice.addIntershipOffer(off);
    }

    @DeleteMapping("/remove/off/{id}")
    public void removePos(@PathVariable("id") Long id) {
        iInternshipOfferservice.deleteIntershipOffer(id);
    }

    @PutMapping("/modify-off/{id}")
    public IntershipOffer updatePos(@PathVariable("id") Long id, @RequestBody IntershipOffer off) {
        off.setIdsujet(id); // Ensure the ID of the offer is included in the request
        return iInternshipOfferservice.updatePos(off);
    }

    // New Image Upload Endpoint
    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<Map<String, String>> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = iInternshipOfferservice.uploadImage(id, file);

            // Return JSON response with image URL
            Map<String, String> response = new HashMap<>();
            response.put("imageUrl", imageUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error uploading image: " + e.getMessage());

            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<UrlResource> getImage(@PathVariable Long id) {
        IntershipOffer offer = internshipOfferService.getInternshipOfferWithImage(id);

        if (offer == null || offer.getImageUrl() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            // Extract the file name from the URL
            String fileName = offer.getImageUrl().substring(offer.getImageUrl().lastIndexOf('/') + 1);
            Path imagePath = Paths.get(UPLOAD_DIR).resolve(fileName);

            System.out.println("File Name: " + fileName);
            System.out.println("Image Path: " + imagePath.toAbsolutePath());

            UrlResource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                System.out.println("File does not exist or is not readable: " + imagePath.toAbsolutePath());
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            System.out.println("Malformed URL: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
