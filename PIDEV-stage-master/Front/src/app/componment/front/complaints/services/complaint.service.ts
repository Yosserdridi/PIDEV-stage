import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Complaint {
    id?: number;
    title: string;
    content: string;
    dateComplaint?: Date;
    typeStatus?: string;
    typeC?: string;
    status?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ComplaintService {
    private apiUrl = 'http://localhost:9091/stage/add-complaint';
    constructor(private http: HttpClient) {}

    getAllComplaints(): Observable<Complaint[]> {
        return this.http.get<Complaint[]>(`${this.apiUrl}/retrieve-all-complaint`);
    }

    getComplaintById(id: number): Observable<Complaint> {
        return this.http.get<Complaint>(`${this.apiUrl}/retrieve-complaint/${id}`);
    }

    addComplaint(complaint: Complaint): Observable<Complaint> {
        return this.http.post<Complaint>(`${this.apiUrl}/add-complaint`, complaint);
    }

    updateComplaint(complaint: Complaint): Observable<Complaint> {
        return this.http.put<Complaint>(`${this.apiUrl}/modify-complaint`, complaint);
    }

    deleteComplaint(id: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/remove-complaint/${id}`);
    }
}
