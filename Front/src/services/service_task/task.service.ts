import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url="http://localhost:9091/stage";


  constructor(private http : HttpClient) { }


  getAllTasks():Observable <Task[]> {
    return this.http.get<Task[]>(`${this.url}/getAllTasks`);
  }

  addTask(task:Task): Observable <Task> {
    return this.http.post<Task>(`${this.url}/addTask`,task);
  }


  addTaskToJournal(journalId: number, task: Task): Observable<any> {
    return this.http.post(`${this.url}/addTaskToJournal/${journalId}/task`, task, { responseType: 'text' });
  }

    getTasksByJournalId(journalId: number): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.url}/getTasksByJournalId/${journalId}`);
    }
    
  


}
