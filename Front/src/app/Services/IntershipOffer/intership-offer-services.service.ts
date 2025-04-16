import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { intershipoffer } from 'src/app/models/intershipoffer';
import { Company } from 'src/app/models/Company';


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
    return this.http.delete<void>(`${this.baseUrl}/remove/off/${id}`);
  }
  
  

 // Upload an image for an internship offer
 uploadImage(id: number, file: File): Observable<{ imageUrl: string }> {
  const formData = new FormData();
  formData.append('file', file);


  return this.http.post<{ imageUrl: string }>(`${this.baseUrl}/${id}/uploadImage`, formData);
}


// Get image for an internship offer
getImage(id: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/${id}/image`, { responseType: 'blob' });
}



  
  getApiUrl(): string {
    return this.baseUrl;
  }


  // Delete image of an internship offer
// Delete the image for an internship offer
deleteImage(id: number): Observable<{ message: string }> {
  return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}/deleteImage`);
}


}
