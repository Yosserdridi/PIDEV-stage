import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Soutenance } from 'src/app/models/soutenance.model';
import { SoutenanceDetails } from 'src/app/models/SoutenanceDetails.model';
import { ValidatedFile } from 'src/app/models/validated-file.model';

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  private baseUrl = 'http://localhost:8080/stage/soutenance';

  constructor(private http: HttpClient) {}

  getAllSoutenanceDetails(): Observable<SoutenanceDetails[]> {
    return this.http.get<SoutenanceDetails[]>(`${this.baseUrl}/details`);
  }

  scheduleSoutenanceByStudent(studentId: number, soutenance: Soutenance): Observable<Soutenance> {
    return this.http.post<Soutenance>(`${this.baseUrl}/schedule-by-student/${studentId}`, soutenance);
  }

  deleteSoutenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  }

  updateSoutenance(soutenance: Soutenance): Observable<Soutenance> {
    return this.http.put<Soutenance>(`${this.baseUrl}/modify`, soutenance);
  }

  getValidatedFiles(): Observable<ValidatedFile[]> {
    return this.http.get<ValidatedFile[]>(`${this.baseUrl}/validated-files`);
  }
}
