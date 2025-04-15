package com.example.back.controller;


import com.example.back.entities.InternshipConvention;
import com.example.back.entities.Teacher;
import com.example.back.repository.ConventionRepository;
import com.example.back.repository.UserRepository;
import com.example.back.services.ConventionService;
import com.example.back.services.ConventionServiceImpl;
import com.example.back.services.EmailSerrvice;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.TreeMap;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ConventionController {

    UserRepository userRepository;
    EmailSerrvice emailService;


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



    @GetMapping("/getConventionWithrelation/{id}")
    public ResponseEntity<InternshipConvention> getConventionWithRelations(@PathVariable Long id) {
        InternshipConvention internshipConvention = conventionServiceImpl.getConventionWithRelations(id);
        return ResponseEntity.ok(internshipConvention);
    }

  /*  @GetMapping("/entities/{conventionId}")
    public Map<String, Object> getAllEntities(@PathVariable Long conventionId) {
        return conventionServiceImpl.getAllEntitiesByConventionId(conventionId);
    }
*/

    @GetMapping("/getALLConventionWithRelation/{conventionId}")
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
    public ResponseEntity<?> getConventionDetailsByStudentId(@PathVariable Long studentId) {
        try {
            List<Map<String, Object>> response = conventionServiceImpl.getAllEntitiesByUserId(studentId);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("error", e.getMessage())
            );
        }
    }




    @PutMapping("/admin/assign-convention")
    public ResponseEntity<?> assignConventionToTeacher(
            @RequestParam Long conventionId,
            @RequestParam Long teacherId) {

        InternshipConvention convention = conventionRepository.findById(conventionId).orElseThrow();
        Teacher teacher = (Teacher) userRepository.findById(teacherId).orElseThrow();

        convention.setAssignedTeacher(teacher);
        conventionRepository.save(convention);

        return ResponseEntity.ok("Convention assigned to teacher successfully.");
    }


    @GetMapping("/api/stats/conventions/validated/monthly")
    public Map<String, Long> getValidatedConventionsByMonth() {
        List<InternshipConvention> validatedConventions = conventionRepository.findByIsValidTrue();

        SimpleDateFormat formatter = new SimpleDateFormat("MM-yyyy");

        return validatedConventions.stream()
                .filter(c -> c.getStartDate() != null) // au cas où la date est nulle
                .collect(Collectors.groupingBy(
                        c -> formatter.format(c.getStartDate()),
                        TreeMap::new, // trie par ordre croissant
                        Collectors.counting()
                ));
    }

    @GetMapping("/api/stats/conventions/invalid/monthly")
    public Map<String, Long> getInvalidConventionsByMonth() {
        // Récupérer les conventions invalidées (isValid = false)
        List<InternshipConvention> invalidConventions = conventionRepository.findByIsValidFalse();

        // Formater la date au format "MM-yyyy"
        SimpleDateFormat formatter = new SimpleDateFormat("MM-yyyy");

        return invalidConventions.stream()
                .filter(c -> c.getStartDate() != null) // au cas où la date est nulle
                .collect(Collectors.groupingBy(
                        c -> formatter.format(c.getStartDate()),
                        TreeMap::new, // trie par ordre croissant
                        Collectors.counting() // compter les occurrences
                ));
    }


    @PostMapping("/api/mail/{id}")
    public ResponseEntity<String> validateInternshipConvention(@PathVariable Long id) {
        try {
            // Logique de récupération de la convention de stage depuis la base de données
            InternshipConvention convention = conventionRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Convention non trouvée pour l'ID : " + id));

            // Exemple d'envoi d'email
            String emailRecipient = convention.getStudent().getEmail(); // L'email réel du stagiaire
            String subject = "Validation de votre convention de stage";
            String body = "Votre convention de stage a été validée avec succès.";

            // Envoi de l'email
            emailService.sendEmail(emailRecipient, subject, body);

            return new ResponseEntity<>("L'email de validation a été envoyé.", HttpStatus.OK);
        } catch (RuntimeException e) {
            // Capturer les erreurs spécifiques
            return new ResponseEntity<>("Erreur: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            // Capturer les autres erreurs générales
            e.printStackTrace(); // Pour le debugging
            return new ResponseEntity<>("Une erreur interne est survenue.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

















}
