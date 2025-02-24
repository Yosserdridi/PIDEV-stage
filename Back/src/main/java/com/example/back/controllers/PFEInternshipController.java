package com.example.back.controllers;

import com.example.back.entities.InternshipPFE;
import com.example.back.entities.Restitution;
import com.example.back.entities.TypeInternship;
import com.example.back.services.IPFEInternshipService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @PostMapping("/{studentId}/assign-internshipPFE")
    public ResponseEntity<InternshipPFE> assignInternshipPFE(
            @PathVariable Long studentId,
            @RequestBody InternshipPFE internshipPFE) {

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


/*   @GetMapping("/student/{studentId}/internshipPFE")
    public ResponseEntity<InternshipPFE> getInternshipPFEForStudent(
            @PathVariable Long studentId,
            @RequestParam TypeInternship typeInternship) {
        // Get the InternshipPFE for the student and typeInternship
        InternshipPFE internshipPFE = ipfeInternshipService.getInternshipPFEForStudent(studentId, typeInternship);
        return ResponseEntity.ok(internshipPFE);
    }*/
}
