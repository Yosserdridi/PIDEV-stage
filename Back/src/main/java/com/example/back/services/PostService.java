package com.example.back.services;


import com.example.back.entities.Comment;
import com.example.back.entities.LikePost;
import com.example.back.entities.Post;
import com.example.back.entities.StatusComplaint;
import com.example.back.repository.CommentRepository;
import com.example.back.repository.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
@Slf4j
public class PostService implements IPostService {

    PostRepository postRepository;

    CommentRepository commentRepository;
    @Override
    public List<Post> getAll() {
        return postRepository.findAll();
    }

    @Override
    public Post getById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);

    }
    public Post addCommentToPost(Long postId, Comment comment) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.getComments().add(comment);  // ✅ Manually adding the comment to Post
        return postRepository.save(post);  // ✅ Saving Post, which will save Comment too
    }

    @Override
    public Post updatepost(Long id, Post postDetails) {
        // Find the post by its ID, if not found, throw an exception
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Post not found with id " + id));


        // Update the fields with the new details
        post.setSubject(postDetails.getSubject()); // Assuming Post has a subject field
        post.setContent(postDetails.getContent()); // Assuming Post has a content field
        //post.setDatePost(postDetails.getDatePost());
        post.setIsAnonymous(postDetails.getIsAnonymous());
        post.setStatus(postDetails.getStatus());
        post.setArchivedReason(postDetails.getArchivedReason()) ;


        // Save the updated post
        return postRepository.save(post);
    }

    @Override
    public List<Post> searchPostsBySubject(String Subject) {
        return postRepository.searchPostsBySubject(Subject);    }

    @Override
    public Comment updateComment(Long commentId, Comment updatedComment) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        existingComment.setDescription(updatedComment.getDescription()); // Update description
        existingComment.setDateComment(new Date()); // Update timestamp if needed

        return commentRepository.save(existingComment);    }


    public Post updatePostStatus(Long id, StatusComplaint newStatus) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        post.setStatus(newStatus); // Update only the status field
        return postRepository.save(post);
    }

    @Override
    public List<Post> searchPostsBySubjectC(String Subject) {
        return postRepository.searchPostsBySubjectC(Subject);
    }

    @Override
    public Post likePost(Long postId, LikePost likeType) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setLikePost(likeType);
        return postRepository.save(post);    }


}
