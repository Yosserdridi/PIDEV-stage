import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  addResponse(complaintId: number, responseText: string) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:9091/stage/complaint'; // URL de base de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les plaintes
  getAllComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/get-complaints`);
  }

  // Récupérer une plainte par son ID
  retrieveComplaint(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.baseUrl}/retrieve-complaint/${id}`);
  }

  // Ajouter une nouvelle plainte
  addComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(`${this.baseUrl}/add-complaint`, complaint);
  }

  // Supprimer une plainte par son ID
  deleteComplaint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-complaint/${id}`);
  }

  // Mettre à jour une plainte
  updateComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.put<Complaint>(`${this.baseUrl}/modify-complaint`, complaint);
  }

  // Récupérer les plaintes par type
  findByTypeC(typeC: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/findByTypeComplaint/${typeC}`);
  }

  // Récupérer les plaintes par statut
  findByStatusC(statusC: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.baseUrl}/findByStatusComplaint/${statusC}`);
  }
}