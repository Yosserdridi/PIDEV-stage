import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private apiUrl = '/stage/api/mail/send';

  constructor(private http: HttpClient) {}

  //sendMail(mailRequest: any){
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //return this.http.post(this.apiUrl, mailRequest  /*, { headers, withCredentials: true }*/);
    sendMail(data: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      return this.http.post(this.apiUrl, data, { headers });
    }
  }




