import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private apiUrl = '/api/pdf/generate'; // Utilisez le proxy

  constructor(private http: HttpClient) {}

  generatePdf(id: number, date_soutenance: Date, heure_soutenance: Date, salle_number: number, bloc: string): Observable<Blob> {
    return this.http.post(this.apiUrl, { id, date_soutenance, heure_soutenance, salle_number, bloc }, {
      responseType: 'blob' // Indique que la réponse est un fichier binaire
    });
  }
}



