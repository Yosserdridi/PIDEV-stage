import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Comment {
  id?: number;  // Optional, as it's usually assigned by the backend
  description?: string;
  dateComment?: Date;  // Optional if backend sets the date
  voteCommentts?: number; // Optional if not needed when creating a comment
}

export interface Post {
  id?: number;
  subject: string;
  content: string;
  date?: Date;
  isAnonymous: boolean;
  datePost: string;
  user: any;
  comments: Comment[];
  picture: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiBaseUrl = 'http://localhost:9091/stage/Post';
  constructor(private http: HttpClient) { }
  // Ajouter un post
  addpost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiBaseUrl}/add`, post);
  }

   //  Récupérer tous les posts
   getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiBaseUrl}/getAll`);
  }

  
// Ajouter un commentaire à un post
addComment(postId: number, commentText: string): Observable<Comment> {
  const comment: Comment = {

    description: commentText,  // Provide a default value if needed

    voteCommentts: 0 // Default vote count
  };
  return this.http.post<Comment>(`${this.apiBaseUrl}/${postId}/comments`, comment);
}

}
