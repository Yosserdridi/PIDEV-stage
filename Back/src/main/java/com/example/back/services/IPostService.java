package com.example.back.services;

import com.example.back.entities.Comment;
import com.example.back.entities.Post;

import java.util.List;

public interface IPostService {
    List<Post> getAll();
    Post getById(Long id);
    Post save(Post post);
    void delete(Long id);

     Post addCommentToPost(Long postId, Comment comment);
}
