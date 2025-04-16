import { Component } from '@angular/core';
import { ForumService, Post } from '../services/forum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

   post: Post = {
      subject: '',
      content: '',
      date: new Date(),
      isAnonymous: false,
      picture: null,
      datePost: new Date().toISOString(), 
      user: undefined,
      comments: []
    };
    selectedFile?: File;

    
   
    posts: Post[] = [];
    constructor(private postService: ForumService,private router: Router) {}
    onFileSelected(event: any): void {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
      }
    }
  //Ajouter un post
  addPost(): void {
    if (!this.post.datePost) {
      this.post.datePost = new Date().toISOString();  // Ensure datePost is set
    }
  
    this.postService.addpost(this.post,this.selectedFile).subscribe(
      (response) => {
        console.log('Post added successfully!', response);
        alert('Post added successfully!');
        this.router.navigate(['forum']);
      },
      (error) => {
        console.error('Error adding post', error);
        alert('Error adding post. Please try again later.');
      }
    );
  }
} 

