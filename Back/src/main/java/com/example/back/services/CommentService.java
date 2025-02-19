package com.example.back.services;

import com.example.back.entities.Comment;
import com.example.back.entities.Post;
import com.example.back.repository.CommentRepository;
import com.example.back.repository.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    public Comment addReply(Long parentCommentId, Comment replyComment) {
        Optional<Comment> parentCommentOpt = commentRepository.findById(parentCommentId);

        if (parentCommentOpt.isPresent()) {
            Comment parentComment = parentCommentOpt.get();
            parentComment.getReponse().add(replyComment); // Add reply to Set<Comment>
            return commentRepository.save(parentComment);
        } else {
            throw new RuntimeException("Parent comment not found!");
        }
    }

    public void deleteCommentFromPost(Long postId, Long commentId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        post.getComments().remove(comment);  // ✅ Remove from post
        postRepository.save(post);  // ✅ Save updated post

        commentRepository.delete(comment);  // ✅ Delete the comment itself
    }
}
