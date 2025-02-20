package com.example.back.controller;


import com.example.back.entities.IntershipOffer;
import com.example.back.entities.Postulation;
import com.example.back.services.IInternshipOfferservice;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
@CrossOrigin(origins = "http://localhost:4200")

//http://localhost:9091/stage/offer


public class InternshipOfferController {

    IInternshipOfferservice iInternshipOfferservice;

    @GetMapping("/retrieve-all")
    public List<IntershipOffer> retrieveAllIntershipOffers() {
        return iInternshipOfferservice.retrieveAllIntershipOffers();
    }

    @GetMapping("/retrieve-off/{id}")
    public IntershipOffer retireIntershipOffer(@PathVariable("id") Long id) {
        return iInternshipOfferservice.retireIntershipOffer(id);
    }

    @PostMapping("/addoff")
    public IntershipOffer addIntershipOffer(@RequestBody IntershipOffer  off) {
        IntershipOffer intershipOffer = iInternshipOfferservice.addIntershipOffer(off);
        return intershipOffer;
    }

    @DeleteMapping("/remove/off/{id}")
    public void removePos(@PathVariable ("id") Long id) {iInternshipOfferservice.deleteIntershipOffer(id);}





    @PutMapping("/modify-off/{id}")
    public IntershipOffer updatePos(@PathVariable("id") Long id, @RequestBody IntershipOffer off) {
        off.setId(id); // Ensure the ID of the offer is included in the request
        return iInternshipOfferservice.updatePos(off);
    }



}
