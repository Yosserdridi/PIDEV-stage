import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { soutenances } from 'src/app/models/soutenances';

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  private baseUrl = 'http://localhost:8080/stage/soutenance/getall';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les soutenances
  getAllsoutenances(page: number, size: number): Observable<soutenances[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<soutenances[]>(`${this.baseUrl}/retrieve-all`);
  }

  // Récupérer une soutenances par son ID
  getsoutenancesById(id: number): Observable<soutenances> {
    return this.http.get<soutenances>(`${this.baseUrl}/retrieve/${id}`);
  }

  // Ajouter une nouvelle soutenances
  addsoutenances(soutenances: soutenances): Observable<soutenances> {
    return this.http.post<soutenances>(`${this.baseUrl}/add-Soutenance`, soutenances);
  }

  // Supprimer une soutenances par son ID
  deletesoutenances(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${id}`);
  }

  // Mettre à jour une soutenances
  updatesoutenances(soutenances: soutenances): Observable<soutenances> {
    return this.http.put<soutenances>(`${this.baseUrl}/modify-pos`, soutenances);
  }

  // Récupérer les soutenances par idsujet
  //getPostulationsByIdsujet(idsujet: number): Observable<soutenances[]> {
    //return this.http.get<soutenances[]>(`${this.baseUrl}/retrieve-by-idsujet/${idsujet}`);
  //}
}
