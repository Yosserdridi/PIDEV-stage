package com.example.back.controllers;

import com.example.back.entities.Files;
import com.example.back.entities.Restitution;
import com.example.back.reopsitory.Report;
import com.example.back.services.IReportService;
import com.example.back.services.IRestitutionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/restitution")
public class RestitutionController {

    IRestitutionService restitutionService;
    IReportService reportService ;

    @PostMapping("/add")
    public Restitution create(@RequestBody Restitution restitution) {
        return restitutionService.save(restitution);
    }
    @GetMapping("/getAll")
    public List<Restitution> getAll() {
        return restitutionService.getAll();
    }

    @GetMapping("/getById/{id}")
    public Restitution getById(@PathVariable Long id) {
        return restitutionService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        restitutionService.delete(id);
    }

    @PostMapping("/addRestitutionAndAssignToPFEInternship/{internshipId}")
    public Restitution addRestitution(@RequestBody Restitution restitution, @PathVariable Long internshipId) {
        return restitutionService.addRestitutionAndAssignToInternship(restitution, internshipId);
    }

    @PostMapping("/addReportAndAssignToPFEInternship/{internshipId}")
    public Files addReport(@RequestBody Files report, @PathVariable Long internshipId) {
        return reportService.addReportAndAssignToInternship(report,internshipId);
    }
}
