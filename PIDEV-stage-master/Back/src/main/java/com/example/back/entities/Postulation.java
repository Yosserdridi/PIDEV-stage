package com.example.back.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Postulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean status ;
    private int PostulationDate ;
    private String comment;
    @ManyToOne
    IntershipOffer intershipOffer ;
    @ManyToOne
    Student student ;



}
