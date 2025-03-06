package com.example.back.services;


import com.example.back.entities.Journal;
import com.example.back.entities.Task;
import com.example.back.repository.JournalRepository;
import com.example.back.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    @Autowired
     TaskRepository taskRepository;

    @Autowired
     JournalRepository journalRepository;


    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Task getTask(Long id) {
        return taskRepository.findById(id).get();
    }

    @Override
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    @Override
    public void journalAssginToTask(long idTask, long idJournal) {
        Journal journal = journalRepository.findById(idJournal).get();
        Task task = taskRepository.findById(idTask).get();
        task.setJournal(journal);
        taskRepository.save(task);

    }

    public Task addTaskToJournal(Long journalId, Task task) {


        Optional<Journal> journalOpt = journalRepository.findById(journalId);
        if (journalOpt.isPresent()) {
            Journal journal = journalOpt.get();
            task.setJournal(journal);
            return taskRepository.save(task);
        }
        throw new RuntimeException("Journal not found");
    }

    public List<Task> getTasksByJournalId(Long journalId) {
        return taskRepository.findByJournalId(journalId);
    }










}
