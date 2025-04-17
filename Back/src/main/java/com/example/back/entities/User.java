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
    private Boolean disponiblePourSoutenance;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Post> posts ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Complaint> complaints ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Files> files;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public Boolean getDisponiblePourSoutenance() {
        return disponiblePourSoutenance;
    }

    public void setDisponiblePourSoutenance(Boolean disponiblePourSoutenance) {
        disponiblePourSoutenance = disponiblePourSoutenance;
    }

    public Set<Post> getPosts() {
        return posts;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }

    public Set<Complaint> getComplaints() {
        return complaints;
    }

    public void setComplaints(Set<Complaint> complaints) {
        this.complaints = complaints;
    }

    public Set<Files> getFiles() {
        return files;
    }

    public void setFiles(Set<Files> files) {
        this.files = files;
    }
}
