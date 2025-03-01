package com.example.back.controller;

import com.example.back.entities.Postulation;
import com.example.back.services.IPostulationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostulationController {

    @Autowired
    private IPostulationService postulationService;

    @GetMapping("/retrieve-all")
    public List<Postulation> retrieveAll() {
        return postulationService.retrieveAllPos();
    }

    @GetMapping("/retrieve-pos/{id}")
    public Postulation retrievePos(@PathVariable("id") Long id) {
        return postulationService.retrievePos(id);
    }

    @PostMapping("/addPos")
    public Postulation addPos(@RequestBody Postulation pos, @RequestParam Long idsujet) {
        return postulationService.addPos(pos, idsujet);
    }

    @DeleteMapping("/remove/{id}")
    public void removePos(@PathVariable("id") Long id) {
        postulationService.deletePos(id);
    }

    @PutMapping("/modify-pos")
    public Postulation updatePos(@RequestBody Postulation pos) {
        return postulationService.updatePos(pos);
    }

    @GetMapping("/retrieve-by-idsujet/{idsujet}")
    public List<Postulation> retrievePostulationsByIdsujet(@PathVariable("idsujet") Long idsujet) {
        return postulationService.getPostulationsByIdsujet(idsujet);
    }

    @GetMapping("/retrieve-by-status")
    public List<Postulation> retrieveByStatus(@RequestParam int status) {
        return postulationService.retrievePostulationsByStatus(status);
    }

    // Accept postulation
    @PutMapping("/accept/{postulationId}")
    public void acceptPostulation(@PathVariable Long postulationId) {
        postulationService.acceptPostulation(postulationId);
    }

    // Reject postulation
    @PutMapping("/reject/{postulationId}")
    public void rejectPostulation(@PathVariable Long postulationId) {
        postulationService.rejectPostulation(postulationId);
    }
}
