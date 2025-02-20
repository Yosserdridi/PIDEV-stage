package com.example.back.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.File;
import java.util.Set;

@Inheritance(strategy = InheritanceType.JOINED)

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String lastName;
    private String firstName;
    private String email;
    private String password;
    private Boolean isAdmin ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Post> posts ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Complaint> complaints ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Files> files;

}
