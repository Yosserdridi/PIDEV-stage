package com.example.back.services;

import com.example.back.entities.Comment;
import com.example.back.entities.LikePost;

import java.util.List;

public interface ICommentService {
    List<Comment> getAll();
    Comment getById(Long id);
    Comment save(Comment post);
    void delete(Long id);
    public Comment updateComment(Long commentId, String newDescription);
 Comment addReply(Long parentId, Comment reply);
    public boolean deleteCommentById(Long commentId);
   /* void deleteCommentFromPost(Long postId, Long commentId);*/

    public void updateCommentReaction(Long commentId, LikePost reaction);
    public void updateReplyReaction(Long replyId, LikePost reaction);
}