import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/model/response.model';


@Injectable({
  providedIn: 'root'
})
export class ResponseService {


  private baseUrl = 'http://localhost:9091/stage/response'; // Base URL of the API


  constructor(private http: HttpClient) { }


  // Get all responses
  retrieveAllResponses(): Observable<ResponseModel[]> {
    return this.http.get<ResponseModel[]>(`${this.baseUrl}/retrieve-all`);
  }






  // Add a new response
  addResponse(response: ResponseModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.baseUrl}/add-response`, response);
  }


  // Update an existing response
  updateResponse(responseId: number, response: ResponseModel): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(`${this.baseUrl}/modify-response/${responseId}`, response);
  }


  // Delete a response by its ID
  deleteResponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


  // Retrieve responses by complaint ID
  retrieveResponsesByComplaintId(complaintId: number): Observable<ResponseModel[]> {
    return this.http.get<ResponseModel[]>(`${this.baseUrl}/retrieve-by-idcomplaint/${complaintId}`);
  }


  getApiUrl(): string {
    return this.baseUrl;
  }
  // Supprimer une plainte par son ID
  deleteComplaint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-complaint/${id}`);
  }
}





