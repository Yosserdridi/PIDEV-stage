package com.example.back.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.lang.reflect.Type;
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
    private Long id;

    @NotNull(message = "Content is required")
    private String content;

    @NotNull(message = "Title is required")
    private String title;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateComplaint;
    @Enumerated(EnumType.STRING)
    private StatusComplaint typeStatus ;
    @Enumerated(EnumType.STRING)
    private TypeComplaint typeC;

    @OneToMany(cascade=CascadeType.ALL,mappedBy = "complaint")
    Set<Response> responses =new HashSet<>();
    // Getter and Setter methods
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
        return dateComplaint;
    }


    public void setDateComplaint(Date dateComplaint) {
        this.dateComplaint = dateComplaint;
    }
    @ManyToOne
    private User user;
    private String status = "New";
    public TypeComplaint getTypeC() {
        return typeC;
    }

    public void setTypeC(TypeComplaint typeC) {
        this.typeC = typeC;
    }

    public StatusComplaint getTypeStatus() {
        return typeStatus;
    }

    public void setTypeStatus(StatusComplaint typeStatus) {
        this.typeStatus = typeStatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
