package com.example.back.services;


import com.example.back.entities.Files;
import com.example.back.entities.Journal;
import com.example.back.repository.FileRepository;
import com.example.back.repository.JournalRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FileServiceImpl implements FileService {

    FileRepository fileRepository;
    JournalRepository journalRepository;

    @Override
    public Files addFile(Files file) {
        return fileRepository.save(file);
    }

    @Override
    public Files updateFile(Files file) {
        return fileRepository.save(file);
    }

    @Override
    public Files getFileById(long id) {
        return fileRepository.findById(id).get();
    }

    @Override
    public List<Files> getAllFiles() {
        return fileRepository.findAll();
    }

    @Override
    public void deleteFileById(long id) {
        fileRepository.deleteById(id);

    }

    @Override
    public void addJournalAndAssignToFile(long idFile, long idJournal) {
        Journal journal = journalRepository.findById(idJournal).get();
        Files file = fileRepository.findById(idFile).get();

        file.setJournal(journal);
         fileRepository.save(file);
    }


}
