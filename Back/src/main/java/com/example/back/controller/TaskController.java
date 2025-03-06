package com.example.back.controller;


import com.example.back.entities.Task;
import com.example.back.services.TaskService;
import com.example.back.services.TaskServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    private final TaskServiceImpl taskServiceImpl;
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

    /*@PostMapping("/journalAssginToTask/{idTask}/{idJournal}")
    public void journalAssginToTask(@PathVariable("idTask") long idTask, @PathVariable("idJournal") long idJournal) {
        taskService.journalAssginToTask(idTask, idJournal);
    }*/


   /* @PostMapping("addTask_/{journalId}")
    public ResponseEntity<Task> addTask(@PathVariable Long journalId, @RequestBody Task task) {
        return ResponseEntity.ok(taskServiceImpl.addTaskToJournal(journalId, task));
    }*/


    @GetMapping("/getTasksByJournalId/{journalId}")
    public ResponseEntity<List<Task>> getTasksByJournalId(@PathVariable Long journalId) {
        List<Task> tasks = taskServiceImpl.getTasksByJournalId(journalId);
        return ResponseEntity.ok(tasks);
    }

}
