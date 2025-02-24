package com.example.back.controllers;

import com.example.back.DTO.InternshipConventionDTO;
import com.example.back.entities.InternshipConvention;
import com.example.back.entities.TypeInternship;
import com.example.back.services.IInternshipConventionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/internships")
@CrossOrigin(origins = "http://localhost:4200")
public class InternshipConventionController {
    IInternshipConventionService internshipConventionService;

    @PostMapping("/add")
    public InternshipConvention create(@RequestBody InternshipConvention internship) {
        return internshipConventionService.save(internship);
    }
    @GetMapping("/getAll")
    public List<InternshipConvention> getAll() {
        return internshipConventionService.getAll();
    }

    @GetMapping("/getById/{id}")
    public InternshipConvention getById(@PathVariable Long id) {
        return internshipConventionService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        internshipConventionService.delete(id);
    }

    @PostMapping("/add/{studentId}")
    public ResponseEntity<Map<String, String>> addInternshipConvention(
            @PathVariable Long studentId,
            @RequestBody InternshipConvention internshipConvention) {
        try {
            internshipConventionService.addInternshipConvention(studentId, internshipConvention);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Internship Convention successfully added.");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error: " + ex.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/student/{studentId}/type/{typeInternship}")
    public ResponseEntity<InternshipConvention> getInternshipConvention(
            @PathVariable Long studentId,
            @PathVariable TypeInternship typeInternship) {

        try {
            InternshipConvention internshipConvention = internshipConventionService.getInternshipConventionByStudentIdAndType(studentId, typeInternship);
            return new ResponseEntity<>(internshipConvention, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getAllWithStudentName")
    public List<InternshipConventionDTO> getAllInternshipConventions() {
        return internshipConventionService.getAllInternshipConventionsWithStudentFirstName();
    }

    @GetMapping("/pfe-id/{studentId}")
    public Long getInternshipConventionId(@PathVariable Long studentId) {
        return internshipConventionService.getInternshipConventionId(studentId);
    }


}
