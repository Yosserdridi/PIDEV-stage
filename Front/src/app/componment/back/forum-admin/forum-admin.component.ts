import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartData, ChartOptions } from 'chart.js';
import { ForumService, Post, StatusComplaint } from 'src/app/services/forum.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-forum-admin',
  templateUrl: './forum-admin.component.html',
  styleUrls: ['./forum-admin.component.css']
})
export class ForumAdminComponent {
  posts: Post[] = [];
  filteredPosts: Post[] = []; // This will hold filtered posts
  searchTerm: string = ''; // Bind this to the search input
  isForumOpen = false;
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 3; // Nombre d'éléments par page

  
  constructor(private postService: ForumService, private router: Router,private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadPosts(); // Load posts when the component is initialized
  }

  // Load all posts
  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data.reverse(); // Show newest posts first
        this.filteredPosts = this.posts.filter(post => post.status === 'Pending'); // Initialize filtered posts with all posts
        console.log('Posts loaded:', this.posts);
      },
      (error) => {
        console.error('Error loading posts', error);
      }
    );
  }

  

  // Search filter for posts
  filterPosts(): void {
    console.log('Search term:', this.searchTerm);
    if (this.searchTerm.trim() === '') {
      this.filteredPosts = this.posts;
    } else {
      console.log('Calling API for search with term:', this.searchTerm);
      this.postService.searchPostsBySubject(this.searchTerm).subscribe(
        (data) => {
          console.log('Search results:', data);
          this.filteredPosts = data;
        },
        (error) => {
          console.error('Error searching posts', error);
        }
      );
    }
  }

  // Delete a post
  deletePost(id: number | undefined): void {
    if (id === undefined) {
      console.error('Invalid post ID');
      return;
    }

    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(
        () => {
          alert('Post deleted successfully!');
          this.posts = this.posts.filter(post => post.id !== id); // Update the posts list
          this.filteredPosts = this.posts; // Ensure filtered posts are updated too
        },
        (error) => {
          console.error('Error deleting post', error);
          alert('Error deleting post. Please try again.');
        }
      );
    }
  }


  // Navigate to Update Post Component
  updatePost(postId: number): void {
    this.router.navigate(['/update-post-back', postId]);
  }

 // Method to approve a post
 approvePost(postId: number): void {
  const updatedPost: Post = {
    ...this.getPostById(postId),
    status:  StatusComplaint.Approved// Use enum value here
  };
  this.updatePostStatus(postId, updatedPost,'approved');
}

// Method to reject a post
rejectPost(postId: number): void {
  const updatedPost: Post = {
    ...this.getPostById(postId),
    status: StatusComplaint.Rejected  // Use enum value here
  };
  this.updatePostStatus(postId, updatedPost,'rejected');
}

private updatePostStatus(postId: number, updatedPost: Post,action: string): void {
  this.postService.updatePost(postId, updatedPost).subscribe(
    (response) => {
      console.log('Post status updated successfully', response);
      // Optionally, you can update the local list of posts
         // Show success message
         alert(`Post has been ${action} successfully!`);
         // Refresh the post list
         this.loadPosts();
    },
    (error) => {
      console.error('Error updating post status', error);
       // Show error message
       alert('Error updating post status. Please try again.');
    }
  );
}

// Dummy method to get the post by ID (replace with actual logic)
private getPostById(postId: number): Post {
  return this.posts.find(post => post.id === postId)!; // Assuming posts are loaded
}
  
  archivePost(postId: number): void {
  // Create a modal window for entering the archive reason
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-20%, -50%)';
  modal.style.zIndex = '9999';
  modal.style.backgroundColor = 'white';
  modal.style.padding = '30px';
  modal.style.borderRadius = '12px';
  modal.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
  modal.style.width = '400px'; // Make the window a little wider

  // Create a close button
  const closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '15px';
  closeButton.style.right = '10px';
  
  closeButton.style.cursor = 'pointer';
  closeButton.style.fontSize = '30px';
  closeButton.style.color = '#dc3545';
  closeButton.style.lineHeight = '1';
  closeButton.onclick = () => document.body.removeChild(modal);

  // Create a text input for the archive reason
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter archive reason';
  input.style.width = '100%';
  input.style.marginBottom = '15px';
  input.style.padding = '10px';
  input.style.border = '1px solid #ccc';
  input.style.borderRadius = '4px';

  // Create a submit button
  const submitButton = document.createElement('button');
  submitButton.innerText = 'Submit';
  submitButton.style.padding = '10px 20px';
  submitButton.style.background = 'linear-gradient(to right, #dc3545, #ff6b6b)';
  submitButton.style.color = 'white';
  submitButton.style.border = 'none';
  submitButton.style.borderRadius = '4px';
  submitButton.style.cursor = 'pointer';
  submitButton.style.marginTop = '10px';
  submitButton.style.display = 'block';
  submitButton.style.marginLeft = 'auto';
  submitButton.style.marginRight = 'auto';
  submitButton.onclick = () => {
    const reason = input.value;
    if (reason) {
      const postToArchive = this.getPostById(postId);
      const updatedPost = {
        ...postToArchive,
        status: StatusComplaint.Archived,
        archivedReason: reason
      };
      this.updatePostStatus(postId, updatedPost, 'archived');
      document.body.removeChild(modal);
    }
  };

  modal.appendChild(closeButton);
  modal.appendChild(input);
  modal.appendChild(submitButton);
  document.body.appendChild(modal);
}



  
  
}

