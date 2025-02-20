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
  addPostulation(postulation: postulation): Observable<postulation> {
    return this.http.post<postulation>(`${this.baseUrl}/addPos`, postulation);
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
}
