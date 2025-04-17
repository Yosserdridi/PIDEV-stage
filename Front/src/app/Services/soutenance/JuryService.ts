import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { soutenances } from 'src/app/models/soutenances';
import { Jury } from 'src/app/models/Jury'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class JuryService {
  private apiUrl = 'http://localhost:8080/soutenances/assigner';

  constructor(private http: HttpClient) {}

  assignerJurys(soutenance: soutenances): Observable<Jury[]> {
    return this.http.post<Jury[]>(this.apiUrl, soutenance);
  }
}
