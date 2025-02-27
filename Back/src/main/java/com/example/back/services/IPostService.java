package com.example.back.services;

import com.example.back.entities.Comment;
import com.example.back.entities.Post;
import com.example.back.entities.StatusComplaint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPostService {
    List<Post> getAll();
    Post getById(Long id);
    Post save(Post post);
    void delete(Long id);

     Post addCommentToPost(Long postId, Comment comment);

    Post updatepost(Long id,Post postDetails);
    public List<Post> searchPostsBySubject(String Subject);
    Comment updateComment(Long commentId, Comment updatedComment);

    Post updatePostStatus(Long id, StatusComplaint newStatus);

    public List<Post> searchPostsBySubjectC(String Subject);
}
