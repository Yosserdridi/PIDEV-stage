import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/model/task';
import { TaskService } from 'src/services/service_task/task.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  tasks: { description: string; date: string }[] = [{ description: '', date: '' }];
  journalId !: number;

  

  constructor(private taskService: TaskService  ,private route: ActivatedRoute){


  }


  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.journalId = +params['id'];  // Get the journalId from the route parameters
    });
  }

  addRow() {
    this.tasks = [...this.tasks, { description: '', date: '' }]; // ✅ Crée un nouveau tableau et garde les anciennes valeurs
  }

  removeRow(index: number) {
    this.tasks.splice(index, 1);
  }


    onSubmit() {

      const hasEmptyTask = this.tasks.some(task => !task.description.trim() || !task.date);

      if (hasEmptyTask) {
        alert("Please fill in all tasks before saving.");
        return; // Arrêter la soumission si une tâche est vide
      }
      this.tasks.forEach((task) => {
        this.taskService.addTaskToJournal(this.journalId, task).subscribe(
          (response) => {
            console.log("Task added successfully!", response);
          },
          (error) => {
            console.error("Error adding task", error);
          }
        );
      });
  
      alert('Tasks added successfully!');
      this.tasks = [{ description: '', date: '' }];
    }
  }
  

