import { Component } from '@angular/core';
import { ForumService, Post } from 'src/app/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  post: Post = {
    subject: '',
    content: '',
    date: new Date(),
    isAnonymous: false,
    picture: null,
    datePost: '',
    user: undefined,
    comments: []
  };

  posts: Post[] = [];
  constructor(private postService: ForumService) {}
  ngOnInit(): void {
    this.loadPosts(); // Charge les posts dès le chargement du composant
  }
  //Ajouter un post
  addPost(): void {
    this.postService.addpost(this.post).subscribe(
      (response) => {
        console.log('Post added successfully!', response);
        alert('Post added successfully!');
      },
      (error) => {
        console.error('Error adding post', error);
        alert('Error adding post. Please try again later.');
      }
    );
  }
   // Charger les posts
  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
        console.log('Posts chargés:', this.posts);
      },
      (error) => {
        console.error('Erreur lors du chargement des posts', error);
      }
    );

    

    
  
}
newComment: { [key: number]: string } = {};


addComment(postId?: number): void {
  if (!postId || !this.newComment[postId]?.trim()) return; // Prevent empty comments

  const commentText = this.newComment[postId].trim(); // Remove spaces

  this.postService.addComment(postId, commentText).subscribe(
    (comment) => {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.comments = [...post.comments, comment]; // Append new comment
      }
      this.newComment[postId] = ''; // Clear input field
      alert('Commentaire ajouté avec succès ! ✅'); // Success alert
    },
    (error) => {
      console.error("Erreur lors de l'ajout du commentaire", error);
    }
  );
}


}
