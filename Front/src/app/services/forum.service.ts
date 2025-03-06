import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Comment {
  likeComment?: string;
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
  Rejected = 'Rejected',
  Archived = 'Archived'
}

export enum LikeType {
  LIKE = 'Like',
  LOVE = 'Love',
  DISLIKE = 'Dislike',
  WOW = 'Wow',
  SAD = 'Sad',
  ANGRY = 'Angry'

}
export interface Post {
  likePost?: string; // ✅ Use the enum instead of `any`
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
  archivedReason?: string;
}

interface Reponse {
  id?: number;  // Optional, as it's usually assigned by the backend
  description?: string;
  dateComment?: Date;  // Optional if backend sets the date
  likePost?: string;
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
  private purgomalumApiUrl = 'https://www.purgomalum.com/service/json?text='; // ✅ Purgomalum API
  private customBadWords: string[] = ["flower", "star", "Flower", "Butterfly"];




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

  likePost(postId: number, likeType: string): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/${postId}/like?likeType=${likeType}`, {});
  }
  likeComment(commentId: number, reactionType: string): Observable<any> {
    return this.http.put(`${this.apiUrlcom}/comment/${commentId}/react?reaction=${reactionType}`, {}, { responseType: 'text' });
  }
  

// Ajouter une réaction à une réponse
likeReply(replyId: number, likeType: string): Observable<any> {
  return this.http.put(`${this.apiUrlcom}/${replyId}/likeReply?likeType=${likeType}`, {});
}



  // ✅ Function to filter text using Purgomalum API
  private filterCustomBadWords(text: string): string {
    let filteredText = text;
    this.customBadWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Match whole word, case insensitive
      filteredText = filteredText.replace(regex, '****'); // Replace with asterisks
    });
    return filteredText;
  } 

  // ✅ Add comment with bad word filtering
  addComment(postId: number, commentText: string): Observable<Comment> {
    return new Observable(observer => {
      // First, apply custom bad word filtering
      let filteredComment = this.filterCustomBadWords(commentText);

      // Then, send the result to Purgomalum for additional filtering
      this.http.get<any>(`${this.purgomalumApiUrl}${encodeURIComponent(filteredComment)}`).subscribe(
        (response) => {
          filteredComment = response.result; // Get cleaned text from Purgomalum

          if (filteredComment !== commentText) {
            alert('Votre commentaire a été modifié pour supprimer les mots inappropriés. 🚫');
          }

          const comment: Comment = {
            text: filteredComment, // Use the fully filtered text
            date: new Date(),
            description: filteredComment,
            voteCommentts: 0
          };

          this.http.post<Comment>(`${this.apiBaseUrl}/${postId}/comments`, comment).subscribe(
            (result) => {
              observer.next(result);
              observer.complete();
            },
            (error) => observer.error(error)
          );
        },
        (error) => {
          console.error('Erreur lors de la vérification des mots interdits', error);
          observer.error(error);
        }
      );
    });
  }
}


