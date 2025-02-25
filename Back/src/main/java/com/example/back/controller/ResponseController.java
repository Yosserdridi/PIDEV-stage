package com.example.back.controller;
import com.example.back.entities.Complaint;
import com.example.back.entities.IntershipOffer;
import com.example.back.entities.Postulation;
import com.example.back.entities.Response;
import com.example.back.repository.ComplaintRep;
import com.example.back.repository.ResponseRep;
import com.example.back.service.IResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
@RestController
@RequestMapping("/response")
@Tag(name = "Gestion Response")


public class ResponseController {
    @Autowired
    private IResponse responseService;

    @PostMapping("/add-response")
    public Response addResponse(@RequestBody Response r) {
        return responseService.addResponse(r); // Use 'responseService' here
    }


    @PutMapping("/modify-response/{id}")
    public Response modifyResponse(@PathVariable("id") Long id, @RequestBody Response r) {
        // First, retrieve the existing response by id
        Response existingResponse = responseService.getResponseById(id);

        if (existingResponse == null) {
            throw new EntityNotFoundException("Response not found with id: " + id);
        }

        // Now update the fields of the existing response with the new data
        existingResponse.setResponse(r.getResponse());
        existingResponse.setDateResponse(r.getDateResponse());

        // Save the updated response
        return responseService.updateResponse(existingResponse);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResponse(@PathVariable Long id) {
        responseService.deleteResponse(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/retrieve-all")
    public List<Response> retrieveAllResponses() {
        return responseService.retrieveAllResponses();
    }

    @GetMapping("/retrieve-by-idcomplaint/{complaintId}")
    public List<Response> retrieveResponsesByComplaintId(@PathVariable("complaintId") Long complaintId) {
        return responseService.getResponsesByComplaintId(complaintId);
    }
}

