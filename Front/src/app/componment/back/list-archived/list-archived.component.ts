import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForumService, Post, StatusComplaint } from 'src/app/services/forum.service';

@Component({
  selector: 'app-list-archived',
  templateUrl: './list-archived.component.html',
  styleUrls: ['./list-archived.component.css']
})
export class ListArchivedComponent {

  posts: Post[] = [];
      filteredPosts: Post[] = []; // This will hold filtered posts
      searchTerm: string = ''; // Bind this to the search input
      isForumOpen = false;
      currentPage: number = 1; // Page actuelle
      itemsPerPage: number = 3; // Nombre d'éléments par page
    
      constructor(private postService: ForumService, private router: Router) {}
    
      ngOnInit(): void {
        this.loadPosts(); // Load posts when the component is initialized
      }
    
      // Load all posts
      loadPosts(): void {
        this.postService.getAllPosts().subscribe(
          (data) => {
            this.posts = data.reverse(); // Show newest posts first
            this.filteredPosts = this.posts.filter(post => post.status === 'Archived'); // Initialize filtered posts with all posts
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

      



       pendingPost(postId: number): void {
        const updatedPost: Post = {
          ...this.getPostById(postId),
          status:  StatusComplaint.Pending// Use enum value here
        };
        this.updatePostStatus(postId, updatedPost,'pending');
      }
     
    
      private getPostById(postId: number): Post {
        return this.posts.find(post => post.id === postId)!; // Assuming posts are loaded
      }
        
}
