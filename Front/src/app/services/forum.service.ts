import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Post {
  id?: number;
  subject: string;
  content: string;
  date?: Date;
  isAnonymous: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiUrl = 'http://localhost:9091/stage/Post/add';
  constructor(private http: HttpClient) { }
  addpost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }
}
