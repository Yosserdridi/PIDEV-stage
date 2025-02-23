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

//http://localhost:9091/stage/post

public class PostulationController {

    IPostulationService postulationService;

    @GetMapping("/retrieve-all")
    public List<Postulation> retrieveAll() {
        return postulationService.retrieveAllPos();
    }

    @GetMapping("/retrieve-pos/{id}")
    public Postulation retrievePos(@PathVariable ("id") Long id) {
        return postulationService.retrievePos(id);
    }

        @PostMapping("/addPos")
        public Postulation addPos(@RequestBody Postulation pos, @RequestParam Long idsujet) {
            // Call the service method and pass the Postulation and idsujet
            Postulation postulation = postulationService.addPos(pos, idsujet);
            return postulation;
        }


    @DeleteMapping("/remove/{id}")
    public void removePos(@PathVariable ("id") Long id) {postulationService.deletePos(id);}


    @PutMapping("/modify-pos")
    public Postulation updatePos(@RequestBody Postulation pos) {
        Postulation postulation = postulationService.updatePos(pos);
        return postulation;
    }


    //   get postulations by idsujet
    @GetMapping("/retrieve-by-idsujet/{idsujet}")
    public List<Postulation> retrievePostulationsByIdsujet(@PathVariable("idsujet") Long idsujet) {
        return postulationService.getPostulationsByIdsujet(idsujet);
    }

}


