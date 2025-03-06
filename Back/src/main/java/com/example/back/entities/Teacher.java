package com.example.back.entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Teacher extends User{
    private String registrationNumber;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Journal> journals;

    //@JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    private Set<InternshipPFE> internshipPFEs;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Restitution> restitutions;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Soutenance> soutenances;
}
