package com.example.back.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String content;
    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateComplaint; // Correction de la casse

    @Enumerated(EnumType.STRING)
    private StatusComplaint typeStatus;

    @Enumerated(EnumType.STRING)
    private TypeComplaint typeC;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "complaint")
    private Set<Response> responses = new HashSet<>(); // Initialisation d'un HashSet

    @ManyToOne
    private User user; // L'utilisateur ayant déposé la plainte

    // Getters et Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDateComplaint() {
        return dateComplaint; // Correction de la méthode
    }

    public void setDateComplaint(Date dateComplaint) {
        this.dateComplaint = dateComplaint; // Correction de la méthode
    }

    public StatusComplaint getTypeStatus() {
        return typeStatus;
    }

    public void setTypeStatus(StatusComplaint typeStatus) {
        this.typeStatus = typeStatus;
    }

    public TypeComplaint getTypeC() {
        return typeC;
    }

    public void setTypeC(TypeComplaint typeC) {
        this.typeC = typeC;
    }

    public Set<Response> getResponses() {
        return responses;
    }

    public void setResponses(Set<Response> responses) {
        this.responses = responses;
    }

    public User getUser() {
        return user; // L'utilisateur ayant déposé la plainte
    }

    public void setUser(User user) {
        this.user = user; // L'utilisateur ayant déposé la plainte
    }
}