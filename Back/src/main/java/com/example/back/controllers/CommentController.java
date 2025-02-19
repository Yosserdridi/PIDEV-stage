package com.example.back.controllers;

import com.example.back.entities.Comment;
import com.example.back.services.ICommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/Comment")
public class CommentController {


    ICommentService commentService;

    @DeleteMapping("/post/{postId}/comment/{commentId}")
    public ResponseEntity<?> deleteCommentFromPost(@PathVariable Long postId, @PathVariable Long commentId) {
        commentService.deleteCommentFromPost(postId, commentId);
        return ResponseEntity.ok("Comment deleted successfully");
    }

    @PostMapping("/{parentId}/reply")
    public Comment addReply(@PathVariable Long parentId, @RequestBody Comment reply) {
        return commentService.addReply(parentId, reply);
    }
}
