package com.example.back.control;

import com.example.back.entities.Soutenance;
import com.example.back.service.soutenanceIMP;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/soutenance")

public class soutenanceController {
    @Autowired
    private soutenanceIMP soutenanceIMP;

    @PostMapping("/add-Soutenance")
    public Soutenance addSoutenance(@RequestBody Soutenance s) {
        Soutenance soutenance = soutenanceIMP.addSoutenance(s);
        return soutenance;
    }
    @DeleteMapping("/remove-Soutenance/{Soutenance-id}")
    public void removeSoutenance(@PathVariable("Soutenance-id") Integer id) {
        soutenanceIMP.deleteSoutenance(id);
    }

    @PutMapping("/modify-Soutenance")
    public Soutenance modifySoutenance(@RequestBody Soutenance s) {
        Soutenance soutenance = soutenanceIMP.updateSoutenance(s);
        return soutenance;

}}
