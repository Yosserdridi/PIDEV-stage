package com.example.back.services;


import com.example.back.entities.Journal;
import com.example.back.entities.Task;
import com.example.back.repository.JournalRepository;
import com.example.back.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {
     TaskRepository taskRepository;
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
}
