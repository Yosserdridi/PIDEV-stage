import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, throwError, timeout } from 'rxjs';
import { Convention } from 'src/model/convention';
import { Task } from 'src/model/task';
import { Entities } from 'src/model/entities';
import { __param } from 'tslib';


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

getConventionsByStudentId(studentId: number): Observable<any[]> {
  return this.http.get<Entities[]>(`${this.url}/details/by-student/${studentId}`);
}


sendSms(userPhone: string, messageContent: string): Observable<any> {
  const params = new HttpParams()
    .set('userPhone', userPhone)
    .set('messageContent', messageContent);

  return this.http.post(`${this.url}/send`, null, { params });
}



getEntitiesByConventionId(conventionId: number): Observable<any> {
  return this.http.get<Entities>(`${this.url}/getALLConventionWithRelation/${conventionId}`);
}

getValidatedConventionsStatsByMonth(): Observable<{ [key: string]: number }> {
  return this.http.get<{ [key: string]: number }>(`${this.url}/api/stats/conventions/validated/monthly`);
}

getInValidatedConventionsStatsByMonth(): Observable<{ [key: string]: number }> {
  return this.http.get<{ [key: string]: number }>(`${this.url}/api/stats/conventions/invalid/monthly`);
}


email(id: number): Observable<any> {
  return this.http.post(`${this.url}/api/mail/${id}`, {})
    .pipe(
      catchError(error => {
        console.error('Error sending test email', error);
        return throwError(error);
      })
    );
}










}
