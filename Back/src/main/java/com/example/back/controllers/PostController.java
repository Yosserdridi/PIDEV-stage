package com.example.back.controllers;

import com.example.back.entities.Comment;
import com.example.back.entities.Post;
import com.example.back.services.IPostService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {
    IPostService iPostService;

    @PostMapping("/add")
    public Post create(@RequestBody Post Post) {
        return iPostService.save(Post);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
      iPostService.delete(id);
    }
    @GetMapping
    public List<Post> getposts(){
        return iPostService.getAll();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id){
        return iPostService.getById(id);
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Post> addCommentToPost(@PathVariable Long postId, @RequestBody Comment comment) {
        return ResponseEntity.ok(iPostService.addCommentToPost(postId, comment));
    }



}
