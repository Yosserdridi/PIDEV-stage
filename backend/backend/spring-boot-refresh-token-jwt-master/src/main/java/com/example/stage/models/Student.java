package com.example.stage.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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
public class Student extends User {
    private String registrationNumber;
    private String cv;
    private String branche;
    private String grade;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "student")
    private Set<Postulation> postulations;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "student")
    private Set<InternshipConvention> internshipConventions;


}