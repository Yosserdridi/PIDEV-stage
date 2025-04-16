import { Component } from '@angular/core';
import { ForumService, Post } from '../services/forum.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent {
  post: Post = {
    id: 0,
    subject: '',
    content: '',
    datePost: new Date().toISOString(),
    isAnonymous: false,
    picture: null,
    user: undefined,
    comments: []
  };
  constructor(
    private route: ActivatedRoute,
    private postService: ForumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.postService.getPostById(postId).subscribe(
        (data) => {
          this.post = data; // Pre-fill the form fields with post data
        },
        (error) => {
          console.error('Error fetching post details for update', error);
        }
      );
    }
  }

  // Handle updating the post
  updatePost(): void {
    if (this.post.subject.trim() && this.post.content.trim()) {
      this.postService.updatePost(this.post.id!, this.post).subscribe(
        (response) => {
          alert('Post updated successfully!');
          this.router.navigate(['/forum']);
        },
        (error) => {
          console.error('Error updating post', error);
          alert('Error updating post. Please try again.');
        }
      );
    }
  }

  // Cancel update and navigate back
  cancelUpdate(): void {
    this.router.navigate(['/forum']);
  }
}

