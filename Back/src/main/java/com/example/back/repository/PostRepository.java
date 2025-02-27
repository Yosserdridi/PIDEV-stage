package com.example.back.repository;

import com.example.back.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    @Query("SELECT p FROM Post p WHERE p.Subject LIKE :Subject")
    List<Post> searchPostsBySubject(@Param("Subject") String subject);

    @Query("SELECT p FROM Post p WHERE LOWER(p.Subject) LIKE LOWER(CONCAT('%', :subject, '%'))")
    List<Post> searchPostsBySubjectC(@Param("subject") String subject);

}
