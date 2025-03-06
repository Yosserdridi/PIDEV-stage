import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TypeInternship } from './../models/type_internship.eunm';
import { Observable } from 'rxjs';

export interface InternshipConvention {
  id?: number;
  companyName: string;
  startDate: Date;
  endDate: Date;
  companyAddress: string;
  companyContact: string;
  typeInternship: TypeInternship; 
  studentFirstName : string ;
}
@Injectable({
  providedIn: 'root'
})
export class InternshipConventionService {

  private baseUrl = 'http://localhost:9091/stage/internships';
  private studentId =  1 ;
  
  constructor(private http: HttpClient) { 

  }
  
  addInternship(internship: InternshipConvention): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/add/${this.studentId}`, internship, { responseType: 'text' as 'json' });
  }

  

  getAllConventions(): Observable<InternshipConvention[]> {
    return this.http.get<InternshipConvention[]>(`${this.baseUrl}/getAll`);
  }
  
}
