package com.example.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class IntershipOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idsujet;
    private String title;
    private String description ;
    private int duration ;
    private String location;
    private String requirements;
    private int numberOfStudents;
    private String imageUrl;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Enumerated(EnumType.STRING)
    private TypeInternship typeInternship ;

    private Long idcompany;




    @OneToMany(cascade = CascadeType.ALL, mappedBy="intershipOffer")
    private Set<Postulation> postulations ;




}
