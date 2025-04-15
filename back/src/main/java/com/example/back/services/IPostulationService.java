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
    List<Postulation> getPostulationsByStudentId(int studentId);

    List<Postulation> retrievePostulationsByStatus(int status);

    void acceptPostulation(Long postulationId);


    void rejectPostulation(Long postulationId);
     Postulation getPostulationWithPdf(Long id);


    String uploadPdf(Long postulationId, MultipartFile file, boolean deleteExistingPdf); // Add the deleteExistingPdf parameter here.


}
