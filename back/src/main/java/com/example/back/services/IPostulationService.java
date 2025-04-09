package com.example.back.services;

import com.example.back.entities.Postulation;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IPostulationService {
    Postulation addPos(Postulation postulation, Long idsujet);
    List<Postulation> retrieveAllPos();
    Postulation retrievePos(Long id);
    Postulation updatePos(Postulation pos);
    void deletePos(Long id);


    List<Postulation> getPostulationsByIdsujet(Long idsujet);


    List<Postulation> retrievePostulationsByStatus(int status);

    void acceptPostulation(Long postulationId);


    void rejectPostulation(Long postulationId);
    String uploadPdf(Long postulationId, MultipartFile file); // Upload PDF for a postulation
    Postulation getPostulationWithPdf(Long id);
}
