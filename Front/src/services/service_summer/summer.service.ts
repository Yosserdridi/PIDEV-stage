import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

       addconevntionToSummer(conventionId: number, summerInternship: Summer): Observable<any> {
          return this.http.post(`${this.url}/addConventionToSummer/${conventionId}/summerInternship`, summerInternship, { responseType: 'text' });
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
