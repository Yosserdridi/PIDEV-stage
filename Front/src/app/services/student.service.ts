import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { InternshipConvention } from './internship-convention.service';
import { TypeInternship } from '../models/type_internship.eunm';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private restitutionUrl = 'http://localhost:9091/stage/restitution';
  private baseUrl = 'http://localhost:9091/stage/student';

  constructor(private http: HttpClient) {}
  

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/getAll`); // Fetching the students correctly
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/getById/${id}`);
  }

  getInternshipByStudentAndType(studentId: number): Observable<InternshipConvention> {
    return this.http.get<InternshipConvention>(`${this.baseUrl}/internshipconvention/${studentId}`);
  }

  addRestitution(internshipId: number, restitution: any): Observable<any> {
    return this.http.post(`${this.restitutionUrl}/addRestitutionAndAssignToPFEInternship/${internshipId}`, restitution);
  }


}
