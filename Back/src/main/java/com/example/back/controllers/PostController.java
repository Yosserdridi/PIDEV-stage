package com.example.back.controllers;

import com.example.back.entities.Comment;
import com.example.back.entities.LikePost;
import com.example.back.entities.Post;
import com.example.back.entities.StatusComplaint;
import com.example.back.services.IPostService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/Post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {
    IPostService iPostService;

    @PostMapping("/add")
    public ResponseEntity<Post> addPost(@RequestParam("subject") String subject,
                     @RequestParam("content") String content,
                     @RequestParam(value = "isAnonymous", required = false) Boolean isAnonymous,
                     @RequestParam(value = "picture", required = false) MultipartFile picture) {

        Post post = new Post();
        post.setSubject(subject);
        post.setContent(content);
        post.setIsAnonymous(isAnonymous != null ? isAnonymous : false);

        if (picture != null && !picture.isEmpty()) {
            try {
                String fileName = UUID.randomUUID().toString() + "_" + picture.getOriginalFilename();
                Path uploadPath = Paths.get("uploads");

                // Ensure the directory exists
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Path filePath = uploadPath.resolve(fileName);
                Files.copy(picture.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                post.setPicture(fileName); // ✅ Store only the filename
                System.out.println("Image saved with filename: " + fileName); // ✅ Log filename

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }else {
            System.out.println("No image uploaded."); // ✅ Log if no image
        }

        Post savedPost = iPostService.save(post);
        System.out.println("Post saved with ID: " + savedPost.getId() + " and Image: " + savedPost.getPicture()); // ✅ Check final saved post
        return ResponseEntity.ok(savedPost);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
      iPostService.delete(id);
    }
    @GetMapping("/getAll")
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

    @PutMapping("/{id}/update")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Post updatedPost = iPostService.updatepost(id, postDetails);
        return ResponseEntity.ok(updatedPost);
}
    // Search posts by subject
    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPostsBySubject(@RequestParam String Subject) {
        List<Post> posts = iPostService.searchPostsBySubjectC(Subject);
        return ResponseEntity.ok(posts);
    }



    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {
        Path filePath = Paths.get("uploads").resolve(filename);
        try {
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                System.out.println("File not found: " + filePath.toString()); // ✅ Debugging

                return ResponseEntity.notFound().build();
            }

            // Determine the content type dynamically
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
            System.out.println("Serving file: " + filename + " with type: " + contentType); // ✅ Debugging

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .cacheControl(CacheControl.noCache().mustRevalidate()) // Prevents caching issues
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);

        } catch (IOException e) { // Both MalformedURLException and IOException are caught here
            System.out.println("Error loading file: " + e.getMessage()); // ✅ Debugging

            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody Comment updatedComment) {
        Comment updated = iPostService.updateComment(commentId, updatedComment);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/status")
        public ResponseEntity<Post> updatePostStatus(@PathVariable Long id, @RequestBody StatusComplaint newStatus) {
        Post updatedPost = iPostService.updatePostStatus(id, newStatus);
        return ResponseEntity.ok(updatedPost);
    }



    @PutMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId, @RequestParam LikePost likeType) {
        Post updatedPost = iPostService.likePost(postId, likeType);
        return ResponseEntity.ok(updatedPost);
    }


}




