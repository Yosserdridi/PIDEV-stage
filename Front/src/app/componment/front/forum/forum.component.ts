import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ForumService, LikeType, Post } from 'src/app/services/forum.service';

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
    datePost: new Date().toISOString(),
    user: undefined,
    comments: [],
   
    
  };

  activePostId: number | null = null;

  reactions = [
    { type: 'Like', icon: 'fa fa-thumbs-up' },    
    { type: 'Dislike', icon: 'fa fa-thumbs-down' },     // 👍 Like
    { type: 'Celebrate', icon: 'fa fa-trophy' },      // 🏆 Celebrate
    { type: 'Support', icon: 'fa fa-handshake-o' },   // 🤝 Support (Use `fa-handshake-o` for older versions)
    { type: 'Love', icon: 'fa fa-heart' },            // ❤️ Love
    { type: 'Insightful', icon: 'fa fa-lightbulb-o' }, // 💡 Insightful (Use `fa-lightbulb-o` in older versions)
              // 😆 Funny (Use `fa-smile-o` for older versions)
    
  ];
  
  
  currentPage: number = 1; // Page actuelle
itemsPerPage: number = 3; // Nombre d'éléments par page


  posts: Post[] = [];
  filteredPosts: Post[] = []; // This will hold filtered posts
  searchTerm: string = ''; // Bind this to the search input
  constructor(private postService: ForumService,private router: Router) {}
  ngOnInit(): void {
    this.loadPosts(); // Charge les posts dès le chargement du composant
    this.filteredPosts = this.posts; // Initially show all posts
  }
  
   // Charger les posts
  loadPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data.reverse(); // Show newest posts first
        this.filteredPosts = this.posts.filter(post => post.status === 'Approved'); // Initialize filtered posts with all posts
        console.log('Posts chargés:', this.posts);
        console.log('Posts received:', this.filteredPosts); // ✅ Check if images are included
      },
      (error) => {
        console.error('Erreur lors du chargement des posts', error);
      }

      
    );
}
filterPosts(): void {
  
    console.log('Search term:', this.searchTerm);
    if (this.searchTerm.trim() === '') {
      this.filteredPosts = this.posts.filter(post => post.status === 'Approved');;
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
// Navigate to Post Details Component
getPostDetails(id: number | undefined): void {
  if (id !== undefined) {
    this.router.navigate(['/post-details', id]);
  } else {
    console.error('Invalid post ID');
  }



}
updatePost(postId: number): void {
  this.router.navigate(['/update-post', postId]);
}

likePost(postId: number, reactionType: string) {
  this.postService.likePost(postId, reactionType).subscribe({
    next: () => {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.likePost = reactionType;
      }
      this.activePostId = null; // Cacher le menu après la sélection
    },
    error: (err) => {
      console.error('Error liking post:', err);
    }
  });
}

showReactions(postId: number) {
  this.activePostId = postId;
}

hideReactions(postId: number) {
  // Delay the hiding process and fade out
  setTimeout(() => {
    if (this.activePostId === postId) {
      this.activePostId = null;
      // Optionally apply a class for fading out effect
      const reactionBox = document.querySelector(`.reaction-box`);
      if (reactionBox) {
        reactionBox.classList.add('hidden');
      }
    }
  }, 50000);
}


getReactionIcon(reaction: string | null): string {
  const reactionObj = this.reactions.find(r => r.type === reaction);
  return reactionObj ? reactionObj.icon : 'assets/reactions/like.png';
}

handleReactionClick(postId: number, reactionType: string) {
  this.likePost(postId, reactionType);
  this.activePostId = null; // Immediately hide reaction menu after selecting
}
}


