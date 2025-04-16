package com.example.back.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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
@Table(name = "complaints")

public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String title;
    private String image;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateComplaint;
    @Enumerated(EnumType.STRING)
    private StatusComplaint typeStatus ;
    @Enumerated(EnumType.STRING)
    private TypeComplaint typeC ;

    @OneToMany(cascade=CascadeType.ALL,mappedBy = "complaint")
    @JsonManagedReference
    Set<Response> responses =new HashSet<>();

    @ManyToOne
    private User user;

}
