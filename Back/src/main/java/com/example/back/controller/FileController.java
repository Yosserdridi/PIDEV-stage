package com.example.back.controller;


import com.example.back.entities.Files;
import com.example.back.entities.Journal;
import com.example.back.services.FileService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class FileController {

     FileService fileService;

     @PostMapping("/addFile")
     public Files addFile(@RequestBody Files file) {
         return fileService.addFile(file);
     }

     @GetMapping("/getFileById/{id}")
    public Files getFileById(@PathVariable("id") long id) {
         return fileService.getFileById(id);
     }

     @GetMapping("/getAllFiles")
    public List<Files> getAllFiles() {
         return fileService.getAllFiles();
     }

     @PutMapping("/updateFile")
    public Files updateFile(@RequestBody Files file) {
         return fileService.updateFile(file);
     }
     @DeleteMapping("/deleteFile/{id}")
    public void deleteFile(@PathVariable("id") long id) {
         fileService.deleteFileById(id);
     }

     @PostMapping("addJournalAndAssignToFile/{id}")
    public void addJournalAndAssignToFile(@PathVariable("id") long id, @RequestBody Journal journal) {

     }

     @PostMapping("addJournalAndAssignToFile/{idFile}/{idJournal}")
    public void addJournalAndAssignToFile(@PathVariable("idFile") long idFile, @PathVariable("idJournal") long idJournal) {
         fileService.addJournalAndAssignToFile(idFile, idJournal);
     }



}
