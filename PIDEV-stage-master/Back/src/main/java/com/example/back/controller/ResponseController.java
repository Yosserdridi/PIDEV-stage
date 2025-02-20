package com.example.back.controller;
import com.example.back.entities.Complaint;
import com.example.back.entities.Response;
import com.example.back.repository.ComplaintRep;
import com.example.back.service.IResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping("/response")
@Tag(name = "Gestion Response")
public class ResponseController {
    @Autowired
    private IResponse responseService;
    @Autowired
    private ComplaintRep complaintRep;

    @PostMapping("/add-response/{complaintId}")
    public Response addResponse(@PathVariable Long complaintId, @RequestBody Response response) {
        System.out.println("ID de la complaint reçu : " + complaintId);
        System.out.println("Contenu de la réponse reçue : " + response.getResponse());

        // Vérifier si la Complaint existe
        Complaint complaint = complaintRep.findById(complaintId)
                .orElseThrow(() -> new EntityNotFoundException("Complaint not found with ID: " + complaintId));

        // Associer la réponse à la plainte
        response.setComplaint(complaint);

        System.out.println("Réponse associée à la complaint ID : " + complaintId);

        // Sauvegarder la réponse en base de données
        return responseService.addResponse(response);
    }





    @PutMapping("/modify-response")
    public Response modifyResponse(@RequestBody Response r) {
        Response response = responseService.updateResponse(r);
        return response;
    }
    @DeleteMapping("/remove-response/{response-id}")
    public void removeResponse(@PathVariable("response-id") Long Id) {
        responseService.deleteResponse(Id);
    }
    @GetMapping("/all")
    public List<Response> getAllResponses() {
        return responseService.getAllResponses();
    }

}

