package com.example.back.services;


import com.example.back.entities.Files;
import com.example.back.entities.InternshipConvention;
import com.example.back.entities.Journal;
import com.example.back.entities.SummerInternship;
import com.example.back.repository.FileRepository;
import com.example.back.repository.JournalRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class JournalServiceImpl implements JournalService {

    JournalRepository journalRepository;

    FileRepository fileRepository;
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

            Files files =filesOptional.get();
            journal.setFile(files);
            return journalRepository.save(journal);
        }
        throw new RuntimeException("conevnyion not found");
    }



}
