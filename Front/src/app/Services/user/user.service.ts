import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/Company';
import { Student } from 'src/app/models/Student';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9091/user';

  constructor(private http: HttpClient) { }


    getCompanyById(id: number): Observable<Company> {
       return this.http.get<Company>(`${this.baseUrl}/company/${id}`);
    }
    
  
    getStudentById(id: number): Observable<Student> {
      return this.http.get<Student>(`${this.baseUrl}/student/${id}`);
   }
   



}
