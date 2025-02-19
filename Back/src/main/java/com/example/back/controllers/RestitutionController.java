package com.example.back.controllers;

import com.example.back.entities.Restitution;
import com.example.back.services.IRestitutionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/restitution")
public class RestitutionController {

    IRestitutionService restitutionService;

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
}
