package com.example.back.entities;

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
public class Postulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int status ;
    private Date PostulationDate ;
    private String comment;
    private Long idsujet;

    /*
    @ManyToOne
    IntershipOffer intershipOffer ;
    @ManyToOne
    Student student ;
*/


}
