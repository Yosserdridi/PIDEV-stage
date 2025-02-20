package com.example.back.services;

import com.example.back.entities.Journal;

import java.util.List;

public interface JournalService {

    Journal createJournal(Journal journal);
    List<Journal> getAllJournals();
    Journal getJournalById(long id);
    Journal updateJournal(Journal journal);
    void deleteJournal(long id);
}
