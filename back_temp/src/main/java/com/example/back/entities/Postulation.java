package com.example.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Temporal(TemporalType.TIMESTAMP)
    private Date postulationDate ;
    private String comment;
     private String titrecandidature;
    private String region;
    private String lettremotivation;
    private String pdfUrl;


    @ManyToOne
    @JoinColumn(name = "idsujet")
    @JsonIgnore
    private IntershipOffer intershipOffer;



    private Long studentid;


}
