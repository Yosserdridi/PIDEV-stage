import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Convention } from 'src/model/convention';
import { Task } from 'src/model/task';


@Injectable({
  providedIn: 'root'
})
export class ConventionService {

  private url="http://localhost:9091/stage";

  constructor(private http : HttpClient) { }

  addInternshipConvention(convention :Convention):Observable <any>{
    return this.http.post<Convention> (`${this.url}/addInternshipConvention`,convention);
  }

  getAllInternshipConventions() :Observable <Convention[]>{

    return this.http.get<Convention[]>(`${this.url}/getAllInternshipConventions`);

  }

deleteConvention(id:number):Observable<void> {
  return this.http.delete<void>(`${this.url}/deleteInternshipConvention/${id}`);

}

getInternshipConvention(id :  number) :Observable <Convention>{

   return this.http.get<Convention>(`${this.url}/getInternshipConvention/${id}`);

}


toggleConventionValidity(id: number, isValid: boolean): Observable<any> {
  return this.http.put<any>(`${this.url}/convention/${id}/validity?isValid=${isValid}`, {});
}









}
