import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private teacherUrl = 'http://localhost:9091/stage/teacher';

  constructor(private http: HttpClient) {}

  private studentId : number = 1 ;
  

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/getAll`); // Fetching the students correctly
  }

  getStudentById(): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/getById/${this.studentId}`);
  }

  getInternshipByStudentAndType(studentId: number): Observable<InternshipConvention> {
    return this.http.get<InternshipConvention>(`${this.baseUrl}/internshipconvention/${studentId}`);
  }

  addRestitution(internshipId: number, restitution: any): Observable<any> {
    return this.http.post(`${this.restitutionUrl}/addRestitutionAndAssignToPFEInternship/${internshipId}`, restitution);
  }


  assignRestitution(teacherId: number, restitutionId: number): Observable<string> {
    const url = `${this.teacherUrl}/${teacherId}/assignRestitution/${restitutionId}`;
    return this.http.post<string>(url, {}, { headers: new HttpHeaders({ 'Accept': '*/*' }) });
  }

  getAllTeachers(): Observable<any[]> {
    return this.http.get<any[]>(this.teacherUrl);
  }
}
