package com.example.back.controllers;

import com.example.back.entities.Comment;
import com.example.back.entities.LikePost;
import com.example.back.services.ICommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/Comment")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {


    ICommentService commentService;

   /* @DeleteMapping("/post/{postId}/comment/{commentId}")
    public ResponseEntity<?> deleteCommentFromPost(@PathVariable Long postId, @PathVariable Long commentId) {
        commentService.deleteCommentFromPost(postId, commentId);
        return ResponseEntity.ok("Comment deleted successfully");
    }*/


    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        boolean deleted = commentService.deleteCommentById(commentId);
        if (deleted) {
            return ResponseEntity.ok("Comment deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/{parentId}/reply")
    public Comment addReply(@PathVariable Long parentId, @RequestBody Comment reply) {
        return commentService.addReply(parentId, reply);
    }


    @PutMapping("/Comment/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody String newDescription) {
        try {
            Comment updatedComment = commentService.updateComment(id, newDescription);
            return ResponseEntity.ok(updatedComment); // Return the updated comment
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if comment not found
        }
    }

    @PutMapping("/comment/{commentId}/react")
    public ResponseEntity<?> updateCommentReaction(@PathVariable Long commentId, @RequestParam LikePost reaction) {
        commentService.updateCommentReaction(commentId, reaction);
        return ResponseEntity.ok("Reaction updated successfully!");
    }

    @PutMapping("/reply/{replyId}/react")
    public ResponseEntity<?> updateReplyReaction(@PathVariable Long replyId, @RequestParam LikePost reaction) {
        commentService.updateReplyReaction(replyId, reaction);
        return ResponseEntity.ok("Reply reaction updated successfully!");
    }

}

