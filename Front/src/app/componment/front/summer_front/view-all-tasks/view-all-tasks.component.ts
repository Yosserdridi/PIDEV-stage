import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/model/task';
import { TaskService } from 'src/services/service_task/task.service';

@Component({
  selector: 'app-view-all-tasks',
  templateUrl: './view-all-tasks.component.html',
  styleUrls: ['./view-all-tasks.component.css']
})
export class ViewAllTasksComponent implements OnInit {

  tasks: { description: string; date: string }[] = [{ description: '', date: '' }];


  journalId !: number;


  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.journalId = +params['id']; ;  // Convert string to number
      this.loadTasks();
    });

  }

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }



  loadTasks(): void {
    if (this.journalId) {
      this.taskService.getTasksByJournalId(this.journalId).subscribe(
        (data) => {
          this.tasks = data;

          this.tasks = data.map(task => ({
            ...task,
            date: task.date.split('T')[0] // Couper la chaîne de la date avant "T"
          }));
          
        },
        (error) => {
          console.error('Error fetching tasks', error);
        }
      );
    }
  }

}
