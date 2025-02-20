package com.example.back.controller;


import com.example.back.entities.SummerInternship;
import com.example.back.services.SummerInternshipService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class SummerInternshipController {

    SummerInternshipService summerInternshipService;

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

    @PostMapping("ConventionAssignToInternship/{idConvention}/{idSummer}")
    public void ConventionAssignToInternship(@PathVariable("idConvention") long idConvention, @PathVariable("idSummer") long idSummer) {
        summerInternshipService.ConventionAssignToInternship(idConvention, idSummer);
    }



}
