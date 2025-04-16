package com.example.back.controller;


import com.example.back.entities.InternshipConvention;
import com.example.back.entities.SummerInternship;
import com.example.back.entities.Task;
import com.example.back.repository.SummerInternshipRepository;
import com.example.back.services.SummerInternshipService;
import com.example.back.services.SummerInternshipServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")

public class SummerInternshipController {

    SummerInternshipService summerInternshipService;

    SummerInternshipServiceImpl summerInternshipServiceImpl;

    SummerInternshipRepository summerInternshipRepository;

    @PostMapping("/addSummerInternship")
    public SummerInternship addSummerInternship(@RequestBody SummerInternship summerInternship) {
        return summerInternshipService.addSummerInternship(summerInternship);
    }

    @GetMapping("/getSummerInternship/{id}")
    public SummerInternship getSummerInternship(@PathVariable("id") long id) {
        return summerInternshipService.getSummerInternship(id);
    }

    @GetMapping("/getAllSummerInternships")
    public List<SummerInternship> getAllSummerInternships() {
        return summerInternshipService.getAllSummerInternships();
    }

    @PutMapping("/updateSummerInternship")
    public void updateSummerInternship(@RequestBody SummerInternship summerInternship) {
        summerInternshipService.updateSummerInternship(summerInternship);
    }

    @DeleteMapping("/deleteSummerInternship/{id}")
    public void deleteSummerInternship(@PathVariable("id") long id) {
        summerInternshipService.deleteSummerInternship(id);
    }

    @PostMapping("/fileAssignToInternship/{idFile}/{idInternship}")
    public void fileAssignToInternship(@PathVariable("idFile") long idFile, @PathVariable("idInternship") long idInternship) {
        summerInternshipService.fileAssignToInternship(idFile, idInternship);
    }

  /*  @PostMapping("ConventionAssignToInternship/{idConvention}/{idSummer}")
    public void ConventionAssignToInternship(@PathVariable("idConvention") long idConvention, @PathVariable("idSummer") long idSummer) {
        summerInternshipService.ConventionAssignToInternship(idConvention, idSummer);
    }*/



    @PostMapping("/addConventionToSummer/{conventionId}/summerInternship")
    public ResponseEntity<SummerInternship> addConventionToSummer(@PathVariable Long conventionId, @RequestBody SummerInternship summerInternship) {
        SummerInternship savedSummer = summerInternshipServiceImpl.addInternshipConvention(conventionId, summerInternship);
        if (savedSummer.getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        System.out.println("Returning SummerInternship JSON: " + savedSummer);
        return ResponseEntity.ok(savedSummer);
    }



   /* @GetMapping("/getInternshipWithrelation/{id}")
    public ResponseEntity<SummerInternship> getInternshipById(@PathVariable Long id) {
        Optional<SummerInternship> summerInternshipOptional= summerInternshipRepository.findById(id);
        return summerInternshipOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }*/

    @GetMapping("/getInternshipWithrelation/{id}")
    public ResponseEntity<Map<String, Object>> getInternshipDetails(@PathVariable Long id) {
        Map<String, Object> response = summerInternshipServiceImpl.getInternshipDetails(id);
        return ResponseEntity.ok(response);
    }





}
