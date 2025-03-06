package com.example.back.services;


import com.example.back.entities.*;
import com.example.back.repository.ConventionRepository;
import com.example.back.repository.JournalRepository;
import com.example.back.repository.SummerInternshipRepository;
import com.example.back.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConventionServiceImpl implements ConventionService {
    ConventionRepository conventionRepository;
     SummerInternshipRepository summerInternshipRepository;
     JournalRepository journalRepository;
     TaskRepository taskRepository;

    @Override
    public InternshipConvention addInternshipConvention(InternshipConvention internshipConvention) {
        return  conventionRepository.save(internshipConvention);
    }

    @Override
    public InternshipConvention getInternshipConvention(long id) {
        return conventionRepository.findById(id).get();
    }

    @Override
    public List<InternshipConvention> getAllInternshipConventions() {
        return  conventionRepository.findAll();
    }

    @Override
    public InternshipConvention updateInternshipConvention(InternshipConvention internshipConvention) {
        return conventionRepository.save(internshipConvention);
    }

    @Override
    public void deleteInternshipConvention(long id) {
         conventionRepository.deleteById(id);
    }


    public InternshipConvention getConventionWithRelations(Long id) {
        return conventionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("convention not found"));
    }

    public Map<String, Object> getAllEntitiesByConventionId(Long conventionId) {
        // Récupérer la convention de stage par ID
        Optional<InternshipConvention> conventionOpt = conventionRepository.findById(conventionId);

        if (conventionOpt.isPresent()) {
            InternshipConvention convention = conventionOpt.get();

            // Récupérer l'internship associé à la convention de stage
            SummerInternship summerInternship = convention.getSummerInternship();

            if (summerInternship != null) {
                // Récupérer le fichier associé à l'internship
                Files file = summerInternship.getFiles();

                if (file != null) {
                    // Récupérer le journal associé au fichier
                    Journal journal = file.getJournal();
                    // Récupérer toutes les tâches associées au journal
                    List<Task> tasks = taskRepository.findByJournalId(journal.getId());

                    // Construire la réponse avec toutes les entités associées
                    Map<String, Object> response = new HashMap<>();
                    response.put("tasks", tasks);  // Liste de toutes les tâches associées au journal
                    response.put("journal", journal);
                    response.put("file", file);
                    response.put("summerInternship", summerInternship);
                    response.put("internshipConvention", convention);

                    return response;
                } else {
                    throw new RuntimeException("Fichier associé à la convention de stage introuvable !");
                }
            } else {
                throw new RuntimeException("Internship associé à la convention de stage introuvable !");
            }
        } else {
            throw new RuntimeException("Convention de stage avec l'ID " + conventionId + " introuvable !");
        }
    }









}
