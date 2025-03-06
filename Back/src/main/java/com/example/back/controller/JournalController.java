package com.example.back.controller;


import com.example.back.entities.Journal;
import com.example.back.entities.SummerInternship;
import com.example.back.entities.Task;
import com.example.back.repository.TaskRepository;
import com.example.back.services.JournalService;
import com.example.back.services.JournalServiceImpl;
import com.example.back.services.TaskServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")

public class JournalController {

    private final TaskServiceImpl taskServiceImpl;
    JournalService journalService;

    JournalServiceImpl journalServiceImpl;

    TaskRepository taskRepository;

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



    @PostMapping("/addTaskToJournal/{journalId}/task")
    public ResponseEntity<Task> addTaskToJournal(@PathVariable Long journalId, @RequestBody Task task) {
        Task savedTask = taskServiceImpl.addTaskToJournal(journalId, task);
        System.out.println("Returning Task JSON: " + savedTask);
        return ResponseEntity.ok(savedTask);
    }



  /*  @PostMapping("/addJournalFile/{fileId}/journal")
    public ResponseEntity<Journal> addJournalFile(@PathVariable Long fileId, @RequestBody Journal journal) {
        Journal journalsave = journalServiceImpl.addJournalFile(fileId, journal);
        System.out.println("Returning Task JSON: " + journalsave);
        return ResponseEntity.ok(journalsave);
    }*/

    @PostMapping("/addJournal/{fileId}")
    public ResponseEntity<Journal> addJournalWithFile(
            @PathVariable Long fileId,
            @RequestBody Journal journal) {
        Journal savedJournal = journalServiceImpl.addJournalFile(fileId, journal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedJournal);
    }


    @GetMapping("/getjournal/{id}")
    public ResponseEntity<Journal> getJournalById(@PathVariable Long id) {
        Journal journal = journalServiceImpl.getJournalWithRelations(id);
        return ResponseEntity.ok(journal);
    }


    @GetMapping("/entities/{journalId}")
    public ResponseEntity<Map<String, Object>> getAllEntities(@PathVariable Long journalId) {
        Map<String, Object> response = journalServiceImpl.getAllEntitiesByJournalId(journalId);
        return ResponseEntity.ok(response);
    }





}
