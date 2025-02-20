package com.example.back.controller;
import com.example.back.entities.Complaint;
import com.example.back.entities.Response;
import com.example.back.entities.StatusComplaint;
import com.example.back.entities.TypeComplaint;
import com.example.back.repository.ComplaintRep;
import com.example.back.service.ComplaintService;
import com.example.back.service.IComplaint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Tag(name = "Gestion Complaint")
@RestController
@AllArgsConstructor
@RequestMapping("/complaint")
public class ComplaintController {
    @Autowired
    private IComplaint complaintService;
    @Autowired
    private ComplaintRep complaintRep;

    @Operation(description = "retrieve all complaints from database")
    @GetMapping("/retrieve-all-complaint")
    public List<Complaint> getComplaint() {
        List<Complaint> listComplaint = complaintService.getComplaint();
        return listComplaint;
    }
    @GetMapping("/retrieve-complaint/{complaint-id}")
    public Complaint retrieveComplaint(@PathVariable("complaint-id") Long Id) {
        Complaint complaint = complaintService.GetComplaintById(Id);
        return complaint;
    }
    @PostMapping("/add-complaint")
    public Complaint addComplaint(@RequestBody Complaint c) {
        // Log pour vérifier les données reçues
        System.out.println("Données reçues : " + c);

        // Ajouter une date si elle est manquante
        if (c.getDateComplaint() == null) {
            c.setDateComplaint(new Date());
        }

        // Si le content ou le title sont manquants, les définir à une valeur par défaut
        if (c.getContent() == null) {
            c.setContent("Content not provided");
        }
        if (c.getTitle() == null) {
            c.setTitle("Title not provided");
        }

        // Vérifier si les types sont valides avant l'ajout
        if (c.getTypeStatus() == null) {
            c.setTypeStatus(StatusComplaint.Pending);  // Valeur par défaut
        }
        if (c.getTypeC() == null) {
            c.setTypeC(TypeComplaint.Others);  // Valeur par défaut
        }
        if (c.getStatus() == null) {
            c.setStatus("New");  // Valeur par défaut
        }

        // Appeler le service pour ajouter la plainte dans la base de données
        return complaintService.addComplaint(c);
    }




    @DeleteMapping("/remove-complaint/{complaint-id}")
    public void removeComplaint(@PathVariable("complaint-id") Long Id) {
        complaintService.deleteComplaint(Id);
    }


    @PutMapping("/modify-complaint")
    public Complaint modifyComplaint(@RequestBody Complaint complaint) {
        if (complaint == null || complaint.getId() == null) {
            throw new IllegalArgumentException("Complaint or Complaint ID must not be null");
        }

        System.out.println("Requête reçue pour modification : " + complaint);

        return complaintRep.findById(complaint.getId())
                .map(existingComplaint -> {
                    existingComplaint.setContent(complaint.getContent());
                    existingComplaint.setTitle(complaint.getTitle());
                    existingComplaint.setDateComplaint(complaint.getDateComplaint());
                    existingComplaint.setTypeC(complaint.getTypeC());
                    existingComplaint.setTypeStatus(complaint.getTypeStatus());
                    existingComplaint.setStatus(complaint.getStatus());
                    return complaintRep.save(existingComplaint);
                })
                .orElseThrow(() -> new EntityNotFoundException("Complaint not found with ID: " + complaint.getId()));
    }


    @GetMapping("/findByTypeComplaint/{TypeC}")
    public List<Complaint> findByTypeC(@PathVariable("TypeC") TypeComplaint typeC){
        List<Complaint> complaints = complaintService.findByTypeC(typeC);
        return complaints;
    }
    @GetMapping("/findByStatusComplaint/{statusC}")
    public List<Complaint> findByStatusC(@PathVariable("statusC") StatusComplaint statusComplaint) {
        return complaintService.findByStatusComplaint(statusComplaint);
    }



}


