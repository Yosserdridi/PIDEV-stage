package com.example.back.controllers;

import com.example.back.entities.InternshipPFE;
import com.example.back.services.IPFEInternshipService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/PfeInternship")
public class PFEInternshipController {
    IPFEInternshipService pfeInternshipService;

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

    @PostMapping("/assign-internships")
    public String assignInternshipsToTeachers() {
        pfeInternshipService.assignInternshipsToTeachers();
        return "Internships successfully assigned to teachers!";
    }
}
