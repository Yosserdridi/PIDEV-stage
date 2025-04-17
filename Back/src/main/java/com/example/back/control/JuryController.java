package com.example.back.control;
import com.example.back.entities.Soutenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jurys")
public class JuryController {

    /*@Autowired
    private JuryService juryService;

    @Autowired
    private JuryRepository juryRepository;

    @GetMapping("/assign/{date}")
    public List<Jury> assignJury(@PathVariable String date) {
        List<Jury> assignedJurys = juryService.assignerJurys(juryRepository.findAll(), date);

        // 🔍 Afficher les jurys pour déboguer
        System.out.println("Jurys assignés : " + assignedJurys);

        return assignedJurys;
    }*/
}

