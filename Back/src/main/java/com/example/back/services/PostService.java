package com.example.back.services;

import com.example.back.entities.Comment;
import com.example.back.entities.Post;
import com.example.back.repository.CommentRepository;
import com.example.back.repository.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
