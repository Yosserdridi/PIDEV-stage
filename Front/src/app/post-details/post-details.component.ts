import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumComment, ForumService, LikeType, Post } from '../services/forum.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  
  
  post!: Post;
  newComment: { [key: number]: string } = {};

  imageUrl: SafeUrl | null = null;
  editingCommentId: number | null = null;
  newCommentDescription: string = '';


  replyDescription: string = '';
  

  reactions = [
    { type: 'Like', icon: 'fa fa-thumbs-up' },  
    { type: 'Dislike', icon: 'fa fa-thumbs-down' },      // 👍 Like
    { type: 'Celebrate', icon: 'fa fa-trophy' },      // 🏆 Celebrate
    { type: 'Support', icon: 'fa fa-handshake-o' },   // 🤝 Support (Use `fa-handshake-o` for older versions)
    { type: 'Love', icon: 'fa fa-heart' },            // ❤️ Love
    { type: 'Insightful', icon: 'fa fa-lightbulb-o' }, // 💡 Insightful (Use `fa-lightbulb-o` in older versions)
    { type: 'Funny', icon: 'fa fa-smile-o' }          // 😆 Funny (Use `fa-smile-o` for older versions)
  ];
  

  constructor(private route: ActivatedRoute, private postService: ForumService ,  private sanitizer: DomSanitizer ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(postId)) {
      this.postService.getPostById(postId).subscribe(
        (data) => {
          console.log("Received Post:", data); // ✅ Debugging: Check if datePost is received
          this.post = data;
  
          // Load the image only if post.picture exists
          if (this.post.picture) {
            this.loadImage(this.post.picture);
          }
        },
        (error) => {
          console.error('Error fetching post details', error);
        }
      );
    }
  }
  
  

 
  posts: Post[] = [];


  addComment(postId?: number): void {
    if (!postId || !this.newComment[postId]?.trim()) return;

    const commentText = this.newComment[postId].trim();

    this.postService.addComment(postId, commentText).subscribe(
      (comment) => {
        console.log('New comment added:', comment);
        this.newComment[postId] = ''; // Clear input field
        alert('Commentaire ajouté avec succès ! ✅');

        // Fetch updated post with new comments
        this.postService.getPostById(postId).subscribe(
          (updatedPost) => {
            this.post = updatedPost;
            console.log('Updated Post:', this.post);
          },
          (error) => console.error("Error refreshing post:", error)
        );
      },
      (error) => {
        console.error("Erreur lors de l'ajout du commentaire", error);
      }
    );
}


loadImage(imagePath: string): void {
  this.postService.getPostImage(imagePath).subscribe(blob => {
    const objectUrl = URL.createObjectURL(blob);
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  });
}

startEditing(commentId: number, currentDescription: string): void {
  this.editingCommentId = commentId;
  this.newCommentDescription = currentDescription;
}

// Function to update comment
updateComment(): void {
  if (!this.editingCommentId || !this.newCommentDescription.trim()) return;

  const updatedComment: ForumComment = {
    id: this.editingCommentId,
    description: this.newCommentDescription,
    dateComment: new Date().toISOString(), // Updating date to current time
    voteComment: 'UpVote' // Or let the user choose the vote
  };

  this.postService.updateComment(this.editingCommentId, updatedComment).subscribe(
    (response) => {
      alert('Comment updated successfully!');
      this.editingCommentId = null;
      this.newCommentDescription = '';

      // Refresh comments after update if necessary
      this.postService.getPostById(this.post.id!).subscribe((updatedPost) => {
        this.post = updatedPost;
      });
    },
    (error) => {
      console.error('Error updating comment', error);
    }
  );
}

replyToComment(commentId: number): void {
  if (!this.newComment[commentId]?.trim()) return;

  const commentText = this.newComment[commentId].trim();
  console.log('Sending reply:', commentText);

  this.postService.addReplyToComment(commentId, commentText).subscribe(
    (reply) => {
      console.log('Reply added:', reply);
      alert('Réponse ajoutée avec succès ! ✅');
      this.newComment[commentId] = ''; // Effacer le champ de saisie

      // Rafraîchir les commentaires après l'ajout
      this.postService.getPostById(this.post.id!).subscribe(
        (updatedPost) => {
          this.post = updatedPost;
        },
        (error) => console.error("Erreur lors de la mise à jour du post :", error)
      );
    },
    (error) => {
      console.error('Erreur lors de l’ajout de la réponse', error);
    }
  );
}
// Variables pour stocker l'ID du post/commentaire/réponse actif
activePostId: number | null = null;
activeCommentId: number | null = null;
activeReplyId: number | null = null;

// Gérer les réactions sur un commentaire
likeComment(commentId: number, reactionType: string) {
  this.postService.likeComment(commentId, reactionType).subscribe({
    next: () => {
      const comment = this.post.comments.find(c => c.id === commentId);
      if (comment) {
        comment.likeComment = reactionType;
      }
      this.activeCommentId = null; // Cacher le menu après la sélection
    },
    error: (err) => {
      console.error('Error liking comment:', err);
    }
  });
}

// Gérer les réactions sur une réponse
 /* likeReply(replyId: number, reactionType: string) {
  this.postService.likeReply(replyId, reactionType).subscribe({
    next: () => {
      this.post.comments.forEach(comment => {
        const reply = comment.reponse.find(r => r.id === replyId);
        if (reply) {
          reply.likeReply = reactionType;
        }
      });
      this.activeReplyId = null; // Cacher le menu après la sélection
    },
    error: (err) => {
      console.error('Error liking reply:', err);
    }
  });
}  */

// Afficher les réactions au survol
showReactions(id: number, type: 'post' | 'comment' | 'reply') {
  if (type === 'comment') {
    this.activeCommentId = id;
  } else if (type === 'reply') {
    this.activeReplyId = id;
  }
}

// Cacher les réactions après le survol
hideReactions(id: number, type: 'post' | 'comment' | 'reply') {
  setTimeout(() => {
    if (type === 'comment' && this.activeCommentId === id) {
      this.activeCommentId = null;
    } else if (type === 'reply' && this.activeReplyId === id) {
      this.activeReplyId = null;
    }
  }, 500);
}

// Récupérer l'icône associée à la réaction
getReactionIcon(reaction: string | null): string {
  const reactionObj = this.reactions.find(r => r.type === reaction);
  return reactionObj ? reactionObj.icon : 'fa fa-thumbs-up';
}



}
