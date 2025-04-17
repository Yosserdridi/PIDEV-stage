import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root',
})
export class userService {
  constructor(private http: HttpClient) { }

  getEtudiantsDisponibles(): Observable<User[]> {
    return this.http.get<User[]>('/api/users/disponibles');
}

}
