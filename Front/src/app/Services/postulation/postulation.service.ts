import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { postulation } from 'src/app/models/postulation';

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  private baseUrl = 'http://localhost:9091/post'; 

  constructor(private http: HttpClient) { }

  // Récupérer toutes les postulations
  getAllPostulations(): Observable<postulation[]> {
    return this.http.get<postulation[]>(`${this.baseUrl}/retrieve-all`);
  }

  // Récupérer une postulation par son ID
  getPostulationById(id: number): Observable<postulation> {
    return this.http.get<postulation>(`${this.baseUrl}/retrieve-pos/${id}`);
  }

  // Ajouter une nouvelle postulation
  addPostulation(postulation: postulation, idsujet: number): Observable<postulation> {
    return this.http.post<postulation>(`${this.baseUrl}/addPos?idsujet=${idsujet}`, postulation);
  }

  // Supprimer une postulation par son ID
  deletePostulation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  }

  // Mettre à jour une postulation
  updatePostulation(postulation: postulation): Observable<postulation> {
    return this.http.put<postulation>(`${this.baseUrl}/modify-pos`, postulation);
  }

  // Récupérer les postulations par idsujet
  getPostulationsByIdsujet(idsujet: number): Observable<postulation[]> {
    return this.http.get<postulation[]>(`${this.baseUrl}/retrieve-by-idsujet/${idsujet}`);
  }

  // Get postulations filtered by status
  getPostulationsByStatus(status: number): Observable<postulation[]> {
    return this.http.get<postulation[]>(`${this.baseUrl}/retrieve-by-status?status=${status}`);
  }

  // Accept postulation
  acceptPostulation(postulationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/accept/${postulationId}`, {});
  }

  // Reject postulation
  rejectPostulation(postulationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/reject/${postulationId}`, {});
  }

  // Upload PDF
  uploadPdf(postulationId: number, file: File): Observable<{ pdfUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ pdfUrl: string }>(`${this.baseUrl}/${postulationId}/uploadPdf`, formData);
  }

  // Get PDF URL
  getPdfUrl(postulationId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${postulationId}/pdf`, { responseType: 'blob' });
  }
}
