package com.example.back.controller;


import com.example.back.entities.InternshipConvention;
import com.example.back.entities.Journal;
import com.example.back.repository.ConventionRepository;
import com.example.back.services.ConventionService;
import com.example.back.services.ConventionServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ConventionController {

    private final ConventionServiceImpl conventionServiceImpl;
    ConventionService conventionService;
        ConventionRepository conventionRepository;

        @PostMapping("/addInternshipConvention")
        public  InternshipConvention addInternshipConvention(@RequestBody InternshipConvention internshipConvention) {
            return conventionService.addInternshipConvention(internshipConvention);
        }

        @GetMapping("getInternshipConvention/{id}")
        public InternshipConvention getInternshipConvention(@PathVariable("id") long id) {
            return conventionService.getInternshipConvention(id);
        }

        /*@GetMapping("getAllInternshipConventions")
    public List<InternshipConvention> getAllInternshipConventions() {
            return conventionService.getAllInternshipConventions();
        }*/

    @GetMapping("/getAllInternshipConventions")
    public ResponseEntity<List<InternshipConvention>> getAllInternshipConventions() {
        List<InternshipConvention> conventions = conventionService.getAllInternshipConventions();
        if (conventions.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if the list is empty
        }
        return ResponseEntity.ok(conventions); // Return 200 OK with the list
    }


    @PutMapping("updateInternshipConvention")
    public InternshipConvention updateInternshipConvention(@RequestBody InternshipConvention internshipConvention) {
            return conventionService.updateInternshipConvention(internshipConvention);
        }

        @DeleteMapping("deleteInternshipConvention/{id}")
    void deleteInternshipConvention(@PathVariable("id") long id) {
            conventionService.deleteInternshipConvention(id);
        }



    @PutMapping("/convention/{id}/validity")
    public ResponseEntity<String> toggleValidity(@PathVariable Long id, @RequestParam boolean isValid) {
        Optional<InternshipConvention> conventionOpt = conventionRepository.findById(id);

        if (conventionOpt.isPresent()) {
            InternshipConvention convention = conventionOpt.get();
            convention.setIsValid(isValid);
            conventionRepository.save(convention);
            return ResponseEntity.ok("Convention validity updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Convention not found.");
        }
    }



    @GetMapping("/getConventionWith relation/{id}")
    public ResponseEntity<InternshipConvention> getConventionWithRelations(@PathVariable Long id) {
        InternshipConvention internshipConvention = conventionServiceImpl.getConventionWithRelations(id);
        return ResponseEntity.ok(internshipConvention);
    }

  /*  @GetMapping("/entities/{conventionId}")
    public Map<String, Object> getAllEntities(@PathVariable Long conventionId) {
        return conventionServiceImpl.getAllEntitiesByConventionId(conventionId);
    }
*/

    @GetMapping("/getALLConventionWithRelation{conventionId}")
    public ResponseEntity<Map<String, Object>> getAllEntitiesByConventionId(@PathVariable Long conventionId) {
        try {
            // Appeler la méthode du service pour récupérer les entités associées
            Map<String, Object> response = conventionServiceImpl.getAllEntitiesByConventionId(conventionId);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Gérer les erreurs, par exemple si l'ID est introuvable
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/details/by-student/{studentId}")
    public ResponseEntity<Map<String, Object>> getConventionDetailsByStudentId(@PathVariable Long studentId) {
        try {
            Map<String, Object> response = conventionServiceImpl.getAllEntitiesByUserId(studentId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("error", e.getMessage())
            );
        }
    }

   





}
