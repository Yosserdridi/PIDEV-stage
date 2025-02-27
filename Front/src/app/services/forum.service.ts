import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Comment {

  date: string|number|Date;
  text: string;
  id?: number;  // Optional, as it's usually assigned by the backend
  description?: string;
  dateComment?: Date;  // Optional if backend sets the date
  voteCommentts?: number; // Optional if not needed when creating a comment
  reponse? : Reponse[] ;
}

export enum StatusComplaint {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected'
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
  status?: StatusComplaint;
}

interface Reponse {
  id?: number;  // Optional, as it's usually assigned by the backend
  description?: string;
  dateComment?: Date;  // Optional if backend sets the date

}



export interface ForumComment {
  id: number;
  description: string;
  dateComment: string;
  voteComment: string;
}


@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiBaseUrl = 'http://localhost:9091/stage/Post';
  private apiUrlcom = 'http://localhost:9091/stage/Comment';




  constructor(private http: HttpClient) { }
  addpost(post: Post, file?: File): Observable<Post> {
    const formData = new FormData();
    formData.append("subject", post.subject);
    formData.append("content", post.content);
    formData.append("isAnonymous", String(post.isAnonymous));
    if (file) {
      formData.append("picture", file);
    }
  
    return this.http.post<Post>(`${this.apiBaseUrl}/add`, formData);
  }

   //  Récupérer tous les posts
   getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiBaseUrl}/getAll`);
  }

  
// Ajouter un commentaire à un post
addComment(postId: number, commentText: string): Observable<Comment> {
  const comment: Comment = {
  text: commentText, // Use the provided text from input
    date: new Date(),
    description: commentText,  // Provide a default value if needed

    voteCommentts: 0 // Default vote count
  };
  return this.http.post<Comment>(`${this.apiBaseUrl}/${postId}/comments`, comment);
}
deletePost(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
}
// Get a single post by ID
getPostById(id: number): Observable<Post> {
  return this.http.get<Post>(`${this.apiBaseUrl}/${id}`);
}
// Mettre à jour un post
updatePost(id: number, post: Post): Observable<Post> {
  return this.http.put<Post>(`${this.apiBaseUrl}/${id}/update`, post);
}
searchPostsBySubject(searchTerm: string): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.apiBaseUrl}/search?Subject=${searchTerm}`);
}

getPostImage(imagePath: string): Observable<Blob> {
    return this.http.get(`${this.apiBaseUrl}/${imagePath}`, { responseType: 'blob' });
  }

  updateComment(commentId: number, updatedComment: ForumComment): Observable<ForumComment> {
    return this.http.put<ForumComment>(`${this.apiBaseUrl}/comments/${commentId}`, updatedComment);
  }

  addReplyToComment(commentId: number, commentText: string): Observable<Comment> {
    const comment: Comment = {
      text: commentText, // Le texte de la réponse
      date: new Date(), // Date actuelle
      description: commentText, // Peut-être redondant, mais s'il est requis
      voteCommentts: 0 // Nombre de votes initialisé à 0
    };
  
    return this.http.post<Comment>(
      `${this.apiUrlcom}/${commentId}/reply`, 
      comment, 
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // ✅ Ajout du Content-Type
      }
    );
  }
  

}


