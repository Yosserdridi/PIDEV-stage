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

}
@Injectable({
  providedIn: 'root'
})
export class InternshipConventionService {

  private apiUrl = 'http://localhost:9091/stage/internships/add';
  constructor(private http: HttpClient) { }
  addInternship(internship: InternshipConvention): Observable<InternshipConvention> {
    return this.http.post<InternshipConvention>(this.apiUrl, internship);
  }
}
