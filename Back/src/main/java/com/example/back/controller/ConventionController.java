package com.example.back.controller;


import com.example.back.entities.InternshipConvention;
import com.example.back.services.ConventionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ConventionController {

        ConventionService conventionService;

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







}
