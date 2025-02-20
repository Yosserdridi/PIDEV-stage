package com.example.back.services;


import com.example.back.entities.Journal;
import com.example.back.repository.JournalRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class JournalServiceImpl implements JournalService {

    JournalRepository journalRepository;
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
}
