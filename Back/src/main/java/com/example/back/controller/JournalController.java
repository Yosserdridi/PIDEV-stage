package com.example.back.controller;


import com.example.back.entities.Journal;
import com.example.back.services.JournalService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class JournalController {

    JournalService journalService;

    @PostMapping("/addJournal")
    public Journal addJournal(@RequestBody Journal journal) {
        return journalService.createJournal(journal);
    }

    @GetMapping("/getJournalByid/{id}")
    public Journal getJournalByid(@PathVariable("id") long id) {
        return journalService.getJournalById(id);
    }

    @GetMapping("/getAllJournal")
    public List<Journal> getAllJournal() {
        return journalService.getAllJournals();
    }

    @PutMapping("/updateJournal")
    public Journal updateJournal(@RequestBody Journal journal) {
        return journalService.updateJournal(journal);
    }

    @DeleteMapping("/deleteJournal/{id}")
    public void deleteJournal(@PathVariable("id") long id) {
        journalService.deleteJournal(id);
    }



}
