package com.example.back.services;

import com.example.back.entities.Files;
import com.example.back.entities.Journal;

import java.util.List;

public interface FileService {

    Files addFile(Files file);
    Files updateFile(Files file);

    Files getFileById(long id);
    List<Files> getAllFiles();

    void deleteFileById(long id);

    void addJournalAndAssignToFile(long idFile, long idJournal);




}
