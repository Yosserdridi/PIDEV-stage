package com.example.back.services;


import com.example.back.entities.*;
import com.example.back.repository.*;
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
    StudentRepository studentRepository;


    @Override
    public InternshipConvention addInternshipConvention(InternshipConvention dto) {
        // 🔥 Récupérer un étudiant statique avec ID = 1
        Student student = studentRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Student with ID 1 not found"));

        // 🔹 Créer la convention et l'associer à ce Student
        InternshipConvention convention = new InternshipConvention();
        convention.setCompanyName(dto.getCompanyName());
        convention.setStartDate(dto.getStartDate());
        convention.setEndDate(dto.getEndDate());
        convention.setCompanyAddress(dto.getCompanyAddress());
        convention.setCompanyContact(dto.getCompanyContact());
        convention.setTypeInternship(dto.getTypeInternship());
        convention.setIsValid(dto.getIsValid());
        convention.setStudent(student);  // 🔥 Associer l'étudiant statique

        return conventionRepository.save(convention);
    }

    //add_convention 2 version avec user


    @Override
    public InternshipConvention getInternshipConvention(long id) {
        return conventionRepository.findById(id).get();
    }

    @Override
    public List<InternshipConvention> getAllInternshipConventions() {
        return conventionRepository.findAll();
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


    //passser id student not id convention pour recupéere convention  et ses detail pou un unser précie
    public Map<String, Object> getAllEntitiesByUserId(Long studentId) {
        // Récupérer la convention de stage par l'ID de l'étudiant
        Optional<InternshipConvention> conventionOpt = conventionRepository.findByStudentId(studentId);

        if (conventionOpt.isPresent()) {
            InternshipConvention convention = conventionOpt.get();

            SummerInternship summerInternship = convention.getSummerInternship();

            if (summerInternship != null) {
                Files file = summerInternship.getFiles();

                if (file != null) {
                    Journal journal = file.getJournal();
                    List<Task> tasks = taskRepository.findByJournalId(journal.getId());

                    Map<String, Object> response = new HashMap<>();
                    response.put("tasks", tasks);
                    response.put("journal", journal);
                    response.put("file", file);
                    response.put("summerInternship", summerInternship);
                    response.put("internshipConvention", convention);

                    return response;
                } else {
                    throw new RuntimeException("Fichier associé à la convention introuvable !");
                }
            } else {
                throw new RuntimeException("Internship associé à la convention introuvable !");
            }
        } else {
            throw new RuntimeException("Aucune convention trouvée pour l'étudiant avec l'ID : " + studentId);
        }
    }

}












