package com.example.back.services;

import com.example.back.entities.Task;

import java.util.List;

public interface TaskService {

    Task createTask(Task task);
    Task updateTask(Task task);
    void deleteTask(Long id);

    Task getTask(Long id);
    List<Task> getTasks();

    void journalAssginToTask(long idTask,long idJournal);

}
