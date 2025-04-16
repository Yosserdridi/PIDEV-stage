package com.example.back.service;

import com.example.back.entities.Complaint;
import com.example.back.entities.IntershipOffer;
import com.example.back.entities.Response;
import com.example.back.entities.StatusComplaint;
import com.example.back.repository.ComplaintRep;
import com.example.back.repository.ResponseRep;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class ResponseService implements IResponse {


    @Autowired
    private ResponseRep responseRep;

    @Autowired
    private ComplaintRep complaintRep;

    public Response addResponse(Response response) {
        // Vérifiez si la plainte existe
        if (response.getComplaint() == null || response.getComplaint().getId() == null) {
            throw new IllegalArgumentException("Complaint ID is required");
        }

        Complaint complaint = complaintRep.findById(response.getComplaint().getId())
                .orElseThrow(() -> new EntityNotFoundException("Complaint not found with id: " + response.getComplaint().getId()));
        complaint.setTypeStatus(StatusComplaint.Approved);
        // Associez la réponse à la plainte
        response.setComplaint(complaint);

        // Sauvegardez la réponse
        return responseRep.save(response);
    }





    @Override
    public Response updateResponse(Response response) {
        return responseRep.save(response);
    }

    @Transactional
    public void deleteResponse(Long id) {

        responseRep.deleteById(id); // Assurez-vous que cette méthode est appelée
    }

    @Override
    public Map<String, Long> getResponsesPerDay() {
        List<Response> responses = responseRep.findAll();

        return responses.stream()
                .collect(Collectors.groupingBy(
                        response -> response.getDateResponse().toString(),
                        Collectors.counting()
                ));
    }

    public List<Response> retrieveAllResponses() {
        return responseRep.findAll();
    }

    public List<Response> getResponsesByComplaintId(Long complaintId) {
        return responseRep.findAll();
    }

    public Response getResponseById(Long id) {
        return responseRep.findById(id).orElseThrow(() -> new EntityNotFoundException("Response not found with id: " + id));
    }

    public List<Response> getResponsesByComplaint_Id(Long complaintId) {
        return responseRep.findByComplaint_Id(complaintId);
    }



}
