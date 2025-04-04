package com.example.stage.models;


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
    private Long id;
    private String content;
    private String title;
    @Temporal(TemporalType.TIMESTAMP)
    private Date DateComplaint;
    @Enumerated(EnumType.STRING)
    private StatusComplaint typeStatus ;
    @Enumerated(EnumType.STRING)
    private TypeComplaint typeC ;

    @OneToMany(cascade=CascadeType.ALL,mappedBy = "complaint")
    Set<Response> responses =new HashSet<>();

    @ManyToOne
    private User user;

}