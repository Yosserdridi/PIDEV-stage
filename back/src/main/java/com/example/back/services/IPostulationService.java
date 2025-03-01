package com.example.back.services;

import com.example.back.entities.Postulation;

import java.util.List;

public interface IPostulationService {
    Postulation addPos(Postulation postulation, Long idsujet);
    List<Postulation> retrieveAllPos();
    Postulation retrievePos(Long id);
    Postulation updatePos(Postulation pos);
    void deletePos(Long id);

    // Get postulations by idsujet
    List<Postulation> getPostulationsByIdsujet(Long idsujet);

    // Retrieve postulations by status
    List<Postulation> retrievePostulationsByStatus(int status);

    // Accept postulation
    void acceptPostulation(Long postulationId);

    // Reject postulation
    void rejectPostulation(Long postulationId);
}
