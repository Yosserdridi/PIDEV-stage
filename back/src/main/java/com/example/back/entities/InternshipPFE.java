package com.example.back.entities;


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

    @OneToOne
    InternshipConvention internshipConvention;

    @ManyToOne
    Teacher teacher;



    @OneToOne
    private Restitution restitution;

    @OneToOne
    private Soutenance soutenance;
}
