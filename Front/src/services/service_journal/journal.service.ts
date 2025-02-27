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



    addJournal( journal:Journal):Observable <any>{
        return this.http.post<Journal> (`${this.url}/addJournal`,journal);
      }




}
