package com.example.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SummerInternship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private int duration;



    private String statuts;

   // @Getter(AccessLevel.NONE)
    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private InternshipConvention internshipConvention;


   // @Getter(AccessLevel.NONE)
    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Files files;
}
