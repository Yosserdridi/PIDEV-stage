package com.example.stage.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InternshipPFE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

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
    FinalDeposit finaldeposit;

    @OneToOne
    private Restitution restitution;

    @OneToOne
    private Soutenance soutenance;
}
