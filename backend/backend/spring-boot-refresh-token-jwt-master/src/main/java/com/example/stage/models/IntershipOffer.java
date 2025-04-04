package com.example.stage.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IntershipOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String description ;
    private int duration ;
    private String location;
    private String requirements;
    private int numberOfStudents;
    @Enumerated(EnumType.STRING)
    private TypeInternship typeInternship ;

    @ManyToOne
    Company company;
    @OneToMany(cascade = CascadeType.ALL, mappedBy="intershipOffer")
    private Set<Postulation> postulations ;

}
