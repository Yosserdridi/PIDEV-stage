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
    isAnonymous: false// Initialiser avec la date actuelle
  };
  
  constructor(private postService: ForumService) {}

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
  
}
