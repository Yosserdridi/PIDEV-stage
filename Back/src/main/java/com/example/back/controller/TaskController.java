package com.example.back.controller;


import com.example.back.entities.Task;
import com.example.back.services.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class TaskController {
    private TaskService taskService;

    @PostMapping("/addTask")
    public Task addTask(@RequestBody Task task) {
        return  taskService.createTask(task);
    }

    @GetMapping("/getTaskByid/{id}")
    public Task getTaskById(@PathVariable("id") long id) {
        return taskService.getTask(id);
    }

    @GetMapping("/getAllTasks")
    public List<Task> getAllTasks() {
        return  taskService.getTasks();
    }

    @PutMapping("/updateTask")
    public Task updateTask(@RequestBody Task task) {
        return  taskService.updateTask(task);
    }

    @DeleteMapping("/deleteTask/{id}")
    public void deleteTask(@PathVariable("id") long id) {
        taskService.deleteTask(id);
    }

    @PostMapping("/journalAssginToTask/{idTask}/{idJournal}")
    public void journalAssginToTask(@PathVariable("idTask") long idTask, @PathVariable("idJournal") long idJournal) {
        taskService.journalAssginToTask(idTask, idJournal);
    }
}
