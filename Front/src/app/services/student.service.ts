import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { InternshipConvention } from './internship-convention.service';
import { TypeInternship } from '../models/type_internship.eunm';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private restitutionUrl = 'http://localhost:9091/stage/restitution';
  private baseUrl = 'http://localhost:9091/stage/student';
  private teacherUrl = 'http://localhost:9091/stage/teacher';

  constructor(private http: HttpClient) {}

  private studentId : number = 3 ;


  
  

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
    const url = `${this.teacherUrl}/getAll`;
    return this.http.get<any[]>(url);
  }

  getStudentById1(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/getById/${studentId}`);
  }


  getTeacherById(teacherId: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teacherUrl}/getById/${teacherId}`);
  }



  getUnassignedInternships(): Observable<any[]> {
    return this.http.get<any[]>(`${this.teacherUrl}/unassigned`);
  }


  assignInternshipToTeacher(teacherId: number, internshipId: number): Observable<any> {
    return this.http.post<any>(
      `${this.teacherUrl}/${teacherId}/assign-internship/${internshipId}`,
      {}
    );
  }

  
}
