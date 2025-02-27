package com.example.back.services;

import com.example.back.entities.Postulation;

import java.util.List;

public interface IPostulationService {
    Postulation addPos(Postulation postulation, Long idsujet);
    List<Postulation> retrieveAllPos();
    Postulation retrievePos(Long id);
    Postulation updatePos(Postulation pos);
    void deletePos(Long id);

    //get postulations by idsujet
    List<Postulation> getPostulationsByIdsujet(Long idsujet);

    List<Postulation> retrievePostulationsByStatus(int status);
}
