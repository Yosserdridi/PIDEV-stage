package com.example.back.controller;
import com.example.back.entities.*;
import com.example.back.repository.ComplaintRep;
import com.example.back.service.ComplaintExportExcelService;
import com.example.back.service.FileStorageService;
import com.example.back.service.IComplaint;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeSet;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
//@Tag(name = "complaint")
@AllArgsConstructor
// Active CORS pour Angular
@RestController
@RequestMapping("/complaint")
public class ComplaintController {

    @Autowired
    private IComplaint complaintService;

    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private ComplaintExportExcelService complaintExportExcelService;
    @Autowired
    private ComplaintRep complaintRep;


    @Operation(description = "Ceci récupère la liste ")
    @GetMapping("/export/excel")
    public ResponseEntity<InputStreamResource> exportToExcel() throws IOException {
        List<Complaint> complaints = complaintRep.findAll();
        ByteArrayInputStream in = complaintExportExcelService.exportToExcel(complaints);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=reclamations.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(in));
    }
    @GetMapping("/get-complaints")
    public List<Complaint> getAllComplaints() {
        return complaintService.getComplaint();
    }

    @GetMapping("/retrieve-complaint/{id}")
    public Complaint retrieveComplaint(@PathVariable ("id") Long id) {
        Complaint complaint = complaintService.retrieveComplaint(id);
        return complaint;    }



   /*     @PostMapping("/add-complaint")
        public ResponseEntity<Complaint> addComplaint(@RequestBody Complaint complaint) {
            Complaint savedComplaint = complaintService.addComplaint(complaint);
            return ResponseEntity.ok(savedComplaint);
        }*/
   @PostMapping("/add-complaint")
   public ResponseEntity<Complaint> addComplaint(
           @RequestParam("content") String content,
           @RequestParam("title") String title,
           @RequestParam("dateComplaint") Date dateComplaint,
           @RequestParam("typeStatus") StatusComplaint typeStatus,
           @RequestParam("typeC") TypeComplaint typeC,
           @RequestParam(value = "image", required = false) MultipartFile image) {
       Complaint complaint = new Complaint();
       complaint.setContent(content);
       complaint.setTitle(title);
       complaint.setDateComplaint(dateComplaint);
       complaint.setTypeStatus(typeStatus);
       complaint.setTypeC(typeC);
       User defaultuser = new User();
       defaultuser.setId(1L);
       complaint.setUser(defaultuser);

       if (image != null && !image.isEmpty()) {
           try {
               String imagePath = fileStorageService.storeFile(image);
               complaint.setImage(imagePath);
           } catch (IOException e) {
               e.printStackTrace();
               return ResponseEntity.badRequest().build();
           }
       }

       Complaint savedComplaint = complaintService.addComplaint(complaint);
       return ResponseEntity.ok(savedComplaint);
   }

    @DeleteMapping("/remove-complaint/{id}")
    public void removeComplaint(@PathVariable ("id") Long id)
    {complaintService.deleteComplaint(id);}

    @GetMapping("/complaints-per-day")
    public Map<String, Long> getComplaintsPerDay() {
        return complaintService.getComplaintsPerDay();
    }


    @PutMapping("/modify-complaint/{id}")
    public Complaint updateComplaint(@PathVariable("id") Long id ,@RequestBody Complaint c) {
        Complaint  complaintX;
        complaintX = complaintService.findByIdComplaint(id);
        complaintX.setDateComplaint(c.getDateComplaint());
        complaintX.setTitle(c.getTitle());
        complaintX.setContent(c.getContent());
        complaintX.setTypeC(c.getTypeC());
        complaintX.setTypeStatus(c.getTypeStatus());
        return complaintService.updateComplaint(complaintX);
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


