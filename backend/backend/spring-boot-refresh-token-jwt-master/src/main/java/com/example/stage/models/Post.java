package com.example.stage.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String content;
    private String Subject;
    private String Picture;
    private Boolean isAnonymous;
    private Date datePost;
    @Enumerated(EnumType.STRING)
    private LikePost likePost ;

    @OneToMany (cascade = CascadeType.ALL)
    private Set<Comment> Comments;

    @ManyToOne
    private User user;
}
