package com.example.back.control;

import com.example.back.dto.SoutenanceDetailsDTO;
import com.example.back.dto.ValidatedFileDTO;
import com.example.back.entities.Files;
import com.example.back.entities.Soutenance;
import com.example.back.service.SoutenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/soutenance")
public class SoutenanceController {

    private final SoutenanceService soutenanceService;

    public SoutenanceController(SoutenanceService soutenanceService) {
        this.soutenanceService = soutenanceService;
    }

    @PostMapping("/add")
    public Soutenance addSoutenance(@RequestBody Soutenance s) {
        return soutenanceService.addSoutenance(s);
    }

    @DeleteMapping("/remove/{id}")
    public void removeSoutenance(@PathVariable("id") Integer id) {
        soutenanceService.deleteSoutenance(id);
    }

    @PutMapping("/modify")
    public Soutenance modifySoutenance(@RequestBody Soutenance s) {
        return soutenanceService.updateSoutenance(s);
    }

    @GetMapping("/all")
    public Page<Soutenance> getAllSoutenances(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return soutenanceService.getAllSoutenances(pageable);
    }

    @GetMapping("/validated-files")
    public List<ValidatedFileDTO> getValidatedFiles() {
        return soutenanceService.getValidatedFiles();
    }


    @PostMapping("/schedule/{fileId}")
    public ResponseEntity<?> scheduleSoutenance(@PathVariable int fileId, @RequestBody Soutenance soutenance) {
        try {
            Soutenance scheduled = soutenanceService.scheduleSoutenance(fileId, soutenance);
            return ResponseEntity.ok(scheduled);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Internal server error"));
        }
    }
    @PostMapping("/schedule-by-student/{studentId}")
    public ResponseEntity<?> scheduleSoutenanceByStudentId(
            @PathVariable Long studentId,
            @RequestBody Soutenance soutenance) {
        try {
            Soutenance scheduled = soutenanceService.scheduleSoutenanceByStudentId(studentId, soutenance);
            return ResponseEntity.ok(scheduled);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }


    @GetMapping("/details")
    public List<SoutenanceDetailsDTO> getAllSoutenanceDetails() {
        return soutenanceService.getAllSoutenanceDetails();
    }

}
