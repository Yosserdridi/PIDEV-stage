package com.example.back.services;

import com.example.back.entities.Comment;
import com.example.back.entities.Post;
import com.example.back.repository.CommentRepository;
import com.example.back.repository.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class CommentService implements ICommentService{

    CommentRepository commentRepository;
    PostRepository postRepository;
    @Override
    public List<Comment> getAll() {
        return null;
    }

    @Override
    public Comment getById(Long id) {
        return null;
    }

    @Override
    public Comment save(Comment post) {
        return null;
    }

    @Override
    public void delete(Long id) {
    commentRepository.deleteById(id);
    }

    @Override
    public Comment updateComment(Long commentId, String newDescription) {
        // Find the comment by ID
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));

        // Update the description (or any other fields you need)
        comment.setDescription(newDescription);

        // Save the updated comment
        return commentRepository.save(comment);
    }


    public Comment addReply(Long parentId, Comment reply) {
        // Find the parent comment by ID
        Comment parentComment = commentRepository.findById(parentId)
                .orElseThrow(() -> new RuntimeException("Parent comment not found"));

        // Set the reply's parent as the parent comment
        if (parentComment.getReponse() == null) {
            parentComment.setReponse(new HashSet<>());
        }

        // Add the reply to the parent comment
        parentComment.getReponse().add(reply);

        // Save the parent comment with the new reply
        commentRepository.save(parentComment);

        return reply;
    }


    /*public void deleteCommentFromPost(Long postId, Long commentId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        post.getComments().remove(comment);  // ✅ Remove from post
        postRepository.save(post);  // ✅ Save updated post

        commentRepository.delete(comment);  // ✅ Delete the comment itself
    }*/


    public boolean deleteCommentById(Long commentId) {
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
            return true;
        }
        return false;
    }


}

