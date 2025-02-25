package com.example.back.controller;
import com.example.back.entities.*;
import com.example.back.repository.ComplaintRep;
import com.example.back.service.IComplaint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
//@Tag(name = "complaint")
@AllArgsConstructor
// Active CORS pour Angular
@RestController
@RequestMapping("/complaint")
public class ComplaintController {

    @Autowired
    private IComplaint complaintService;


    @Operation(description = "Ceci récupère la liste ")

    @GetMapping("/get-complaints")
    public List<Complaint> getAllComplaints() {
        return complaintService.getComplaint();
    }

    @GetMapping("/retrieve-complaint/{id}")
    public Complaint retrieveComplaint(@PathVariable ("id") Long id) {
        Complaint complaint = complaintService.retrieveComplaint(id);
        return complaint;    }



    @PostMapping("/add-complaint")
    public ResponseEntity<Complaint> addComplaint(@RequestBody Complaint complaint) {
        Complaint savedComplaint = complaintService.addComplaint(complaint);
        return ResponseEntity.ok(savedComplaint);
    }
    @DeleteMapping("/remove-complaint/{id}")
    public void removeComplaint(@PathVariable ("id") Long id)
    {complaintService.deleteComplaint(id);}



    @PutMapping("/modify-complaint")
    public Complaint updateComplaint(@RequestBody Complaint c) {
        Complaint complaint = complaintService.updateComplaint(c);
        return complaint;
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


