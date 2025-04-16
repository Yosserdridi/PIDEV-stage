import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Summer } from 'src/model/summer';

@Injectable({
  providedIn: 'root'
})
export class SummerService {

  private url="http://localhost:9091/stage";


  constructor(private http : HttpClient) { }

  /*addSummerInternship( summer:Summer):Observable <any>{
      return this.http.post<Summer> (`${this.url}/addSummerInternship`,summer);
    }*/

      addconevntionToSummer(conventionId: number, internshipData: any): Observable<any> {
        return this.http.post<any>(`${this.url}/addConventionToSummer/${conventionId}/summerInternship`, internshipData).pipe(
          tap((response) => {
            console.log('Response from backend:', response);
          })
        );
      }
      

       getAllSummerInternships() :Observable <Summer[]>{
  
      return this.http.get<Summer[]>(`${this.url}/getAllSummerInternships`);
  
    }
  
    deleteSummerInternship(id:number):Observable<void> {
    return this.http.delete<void>(`${this.url}/deleteSummerInternship/${id}`);
  
  }
  
  getSummerInternship(id :  number) :Observable <Summer>{
  
     return this.http.get<Summer>(`${this.url}/getSummerInternship/${id}`);
  
  }

  updateSummerInternship(id:number ,summer:any):Observable<any> {
    return this.http.put(`${this.url}/updateSummerInternship/${id}`,summer);
  
  }

 

  

  
}
