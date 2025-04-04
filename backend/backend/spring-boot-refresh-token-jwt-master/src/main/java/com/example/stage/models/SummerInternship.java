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
public class SummerInternship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    private String description;

    private int duration;

    private Date startDate;

    private Date endDate;

    private String stauts;


    @OneToOne
    private InternshipConvention internshipConvention;

    @OneToOne
    Journal journal;
}
