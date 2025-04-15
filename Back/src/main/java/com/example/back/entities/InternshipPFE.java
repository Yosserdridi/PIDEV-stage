package com.example.back.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class InternshipPFE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private String status;
    private String signedConvention;
    private String signaturePath;


    @JsonBackReference
    @OneToOne
    InternshipConvention internshipConvention;

    @OneToOne
    private Restitution restitution;

    @OneToOne
    private Files report;

    @OneToOne
    private Soutenance soutenance;




/*
    @JsonBackReference
    @ManyToOne
    Teacher teacher ;
*/



}
