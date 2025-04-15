import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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

  getPostulationsByStudentId(studentId: number): Observable<postulation[]> {
    return this.http.get<postulation[]>(`${this.baseUrl}/student/${studentId}`);
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

  updatePdf(postulationId: number, file: File, deleteExistingPdf: boolean = false): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.put(`${this.baseUrl}/${postulationId}/updatePdf?deleteExistingPdf=${deleteExistingPdf}`, formData, {
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  // Added back this function
  getPdfBlob(postulationId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${postulationId}/pdf`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error?.message) {
        errorMessage += `\nDetails: ${error.error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  
  
  
}
