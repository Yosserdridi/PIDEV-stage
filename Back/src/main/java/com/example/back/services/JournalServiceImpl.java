package com.example.back.services;


import com.example.back.entities.*;
import com.example.back.repository.FileRepository;
import com.example.back.repository.JournalRepository;
import com.example.back.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
@AllArgsConstructor
public class JournalServiceImpl implements JournalService {

    JournalRepository journalRepository;

    FileRepository fileRepository;

    TaskRepository taskRepository;
    @Override
    public Journal createJournal(Journal journal) {
        return journalRepository.save(journal);
    }

    @Override
    public List<Journal> getAllJournals() {
        return journalRepository.findAll();
    }

    @Override
    public Journal getJournalById(long id) {
        return journalRepository.findById(id).get();
    }

    @Override
    public Journal updateJournal(Journal journal) {
        return journalRepository.save(journal);
    }

    @Override
    public void deleteJournal(long id) {
            journalRepository.deleteById(id);
    }

    public Journal addJournalFile(Long fileId, Journal journal) {

        Optional<Files> filesOptional = fileRepository.findById(fileId);

        if (filesOptional.isPresent()) {
            Files files = filesOptional.get();

            // Associate the file with the journal
           // journal.setFile(files);
            Journal savedJournal = journalRepository.save(journal);

            // Update the file entity with the journal ID
            files.setJournal(savedJournal);  // Assuming Files has a reference to Journal
            fileRepository.save(files); // Save the updated file

            return savedJournal;
        }

        throw new RuntimeException("File not found");
    }


    public Journal getJournalWithRelations(Long id) {
        return journalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journal not found"));
    }


    public Map<String, Object> getAllEntitiesByJournalId(Long journalId) {
        // Récupérer le journal par ID
        Optional<Journal> journalOpt = journalRepository.findById(journalId);

        if (journalOpt.isPresent()) {
            Journal journal = journalOpt.get();

            // Récupérer toutes les tâches associées au journal
            List<Task> tasks = taskRepository.findByJournalId(journalId);

            // Récupérer le fichier associé au journal
            Files file = fileRepository.findById(journal.getFile().getId()).orElse(null);

            if (file != null) {
                // Récupérer l'internship associé au fichier
                SummerInternship summerInternship = file.getSummerInternship();
                InternshipConvention convention = summerInternship.getInternshipConvention();

                // Construire la réponse avec toutes les entités associées
                Map<String, Object> response = new HashMap<>();
                response.put("tasks", tasks);  // Liste de toutes les tâches associées au journal
                response.put("journal", journal);
                response.put("file", file);
                response.put("summerInternship", summerInternship);
                response.put("internshipConvention", convention);

                return response;
            } else {
                throw new RuntimeException("Fichier avec l'ID " + journal.getFile() + " introuvable !");
            }
        } else {
            throw new RuntimeException("Journal avec l'ID " + journalId + " introuvable !");
        }
    }





}
