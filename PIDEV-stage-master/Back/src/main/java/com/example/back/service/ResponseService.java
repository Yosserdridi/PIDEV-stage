package com.example.back.service;

import com.example.back.entities.Response;
import com.example.back.repository.ResponseRep;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor

public class ResponseService implements IResponse{
    @Autowired
    private ResponseRep responseRep;
    @Override
    public Response addResponse(Response response) {
        System.out.println("Ajout de la réponse : " + response.getResponse());

        // Vérifier si la date est NULL et l'initialiser à la date actuelle
        if (response.getDateResponse() == null) {
            response.setDateResponse(new Date());
        }

        System.out.println("Date de la réponse après correction : " + response.getDateResponse());

        return responseRep.save(response);
    }


    @Override
    public Response updateResponse(Response response) {
        return responseRep.save(response);
    }
    @Override
    public void deleteResponse(Long id) {

        responseRep.deleteById(id);
    }

    @Override
    public List<Response> getAllResponses() {
        return responseRep.findAll();
    }
}
