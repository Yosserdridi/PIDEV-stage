import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Journal } from 'src/model/journal';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  private url="http://localhost:9091/stage";


  constructor(private http : HttpClient) { }



  /*  addJournal( journal:Journal):Observable <any>{
        return this.http.post<Journal> (`${this.url}/addJournal`,journal);
      }*/

        addJournal(fileId: number, journal: any): Observable<any> {
          return this.http.post(`${this.url}/addJournal/${fileId}`, journal);
        }


        getInternshipWithrelation(fileId: number): Observable<any> {
          return this.http.get<any>(`${this.url}/getInternshipWithrelation/${fileId}`);
        }

        getAllEntitiesByJournalId(journalId: number): Observable<any> {
          return this.http.get(`${this.url}/entities/${journalId}`);
        }
      



}
