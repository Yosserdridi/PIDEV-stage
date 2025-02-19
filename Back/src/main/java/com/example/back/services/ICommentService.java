package com.example.back.services;

import com.example.back.entities.Comment;

import java.util.List;

public interface ICommentService {
    List<Comment> getAll();
    Comment getById(Long id);
    Comment save(Comment post);
    void delete(Long id);

    Comment addReply(Long parentCommentId, Comment replyComment);

    void deleteCommentFromPost(Long postId, Long commentId);
}