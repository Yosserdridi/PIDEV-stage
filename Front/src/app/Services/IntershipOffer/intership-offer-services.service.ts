import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { intershipoffer } from 'src/app/models/intershipoffer';


@Injectable({
  providedIn: 'root'
})
export class IntershipOfferService {

  private baseUrl = 'http://localhost:9091/offer';

  constructor(private http: HttpClient) { }

  // Get all internship offers
  getAllOffers(): Observable<intershipoffer[]> {
    return this.http.get<intershipoffer[]>(`${this.baseUrl}/retrieve-all`);
  }

  // Get a single offer by ID
  getOfferById(id: number): Observable<intershipoffer> {
    return this.http.get<intershipoffer>(`${this.baseUrl}/retrieve-off/${id}`);
  }

  // Add a new internship offer
  addOffer(offer: intershipoffer): Observable<intershipoffer> {
    return this.http.post<intershipoffer>(`${this.baseUrl}/addoff`, offer);
  }

  updateOffer(offer: intershipoffer): Observable<intershipoffer> {
    return this.http.put<intershipoffer>(`http://localhost:9091/offer/modify-off/${offer.idsujet}`, offer);
  }
  
    

  // Delete an internship offer
  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/rezmove/off/${id}`);
  }
  
  




  
  getApiUrl(): string {
    return this.baseUrl;
  }


}
