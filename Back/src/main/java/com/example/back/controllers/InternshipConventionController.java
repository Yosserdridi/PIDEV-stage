package com.example.back.controllers;

import com.example.back.entities.InternshipConvention;
import com.example.back.services.IInternshipConventionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<String> addInternshipConvention(
            @PathVariable Long studentId,
            @RequestBody InternshipConvention internshipConvention) {
        try {
            internshipConventionService.addInternshipConvention(studentId, internshipConvention);
            return new ResponseEntity<>("Internship Convention successfully added.", HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST); // Handle errors
        }
    }

}
